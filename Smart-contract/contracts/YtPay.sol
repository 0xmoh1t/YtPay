// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract YTPay is Ownable, ReentrancyGuard {
    IERC20 public immutable pyUSD;  // PayPal USD stablecoin

    struct Channel {
        address wallet;    // creator's wallet
        bool registered;   // has this channel been verified/registered?
        uint256 locked;    // pending funds (before registration)
    }

    mapping(bytes32 => Channel) private channels;

    event PaymentLocked(bytes32 indexed key, string channelId, address payer, uint256 amount);
    event PaymentSent(bytes32 indexed key, string channelId, address payer, address wallet, uint256 amount);
    event ChannelRegistered(bytes32 indexed key, string channelId, address wallet);
    event FundsReleased(bytes32 indexed key, string channelId, address wallet, uint256 amount);

    constructor(address _pyUSD) {
        pyUSD = IERC20(_pyUSD); // assign PYUSD contract address at deploy time
    }

    function _key(string memory channelId) internal pure returns (bytes32) {
        return keccak256(bytes(channelId));
    }

    /// @notice Pay a YouTube channel (if registered, funds are sent directly; otherwise locked until registration)
    function pay(string calldata channelId, uint256 amount) external nonReentrant {
        require(amount > 0, "Invalid amount");
        bytes32 k = _key(channelId);

        // Transfer PYUSD from payer to this contract
        require(pyUSD.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        Channel storage ch = channels[k];
        if (ch.registered && ch.wallet != address(0)) {
            // If channel is already registered, forward funds directly to their wallet
            require(pyUSD.transfer(ch.wallet, amount), "Forward transfer failed");
            emit PaymentSent(k, channelId, msg.sender, ch.wallet, amount);
        } else {
            // Otherwise hold funds until creator registers
            ch.locked += amount;
            emit PaymentLocked(k, channelId, msg.sender, amount);
        }
    }

    /// @notice Register a YouTube channel with its payout wallet (onlyOwner for now)
    function registerChannel(string calldata channelId, address wallet) external onlyOwner nonReentrant {
        require(wallet != address(0), "Invalid wallet");
        bytes32 k = _key(channelId);
        Channel storage ch = channels[k];
        require(!ch.registered, "Already registered");

        ch.wallet = wallet;
        ch.registered = true;
        emit ChannelRegistered(k, channelId, wallet);

        // Release any previously locked payments
        if (ch.locked > 0) {
            uint256 amt = ch.locked;
            ch.locked = 0;
            require(pyUSD.transfer(wallet, amt), "Release transfer failed");
            emit FundsReleased(k, channelId, wallet, amt);
        }
    }

    /// @notice Get channel details (wallet, registered status, and locked funds)
    function getChannel(string calldata channelId) external view returns (address wallet, bool registered, uint256 locked) {
        bytes32 k = _key(channelId);
        Channel storage ch = channels[k];
        return (ch.wallet, ch.registered, ch.locked);
    }
}