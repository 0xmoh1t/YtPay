// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract YTPay is Ownable(address(0xBCefBF450ba98F187DdEF16a20F5540bE7816dC4)), Pausable {
    IERC20 public pyUSD;
    
    mapping(string => uint256) public pendingBalances;
    mapping(string => address) public creatorWallets;

    // Events
    event PaymentSent(string indexed channelId, address indexed from, uint256 amount, bool direct);
    event BalanceClaimed(string indexed channelId, address indexed to, uint256 amount);
    event CreatorWalletAssigned(string indexed channelId, address indexed wallet);

    constructor(address _pyUSD) {
        require(_pyUSD != address(0), "Invalid PYUSD address");
        pyUSD = IERC20(_pyUSD);
    }

    // Admin can update token address
    function setToken(address _pyUSD) external onlyOwner {
        require(_pyUSD != address(0), "Invalid PYUSD address");
        pyUSD = IERC20(_pyUSD);
    }

    // Admin can pause/unpause contract
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // Emergency withdrawal of stuck tokens
    function emergencyWithdraw(address token, uint256 amount, address to) external onlyOwner {
        require(to != address(0), "Invalid recipient");
        IERC20(token).transfer(to, amount);
    }

    // Assign creator wallet
    function assignCreatorWallet(string calldata channelId, address wallet) external onlyOwner {
        require(wallet != address(0), "Invalid wallet");
        require(creatorWallets[channelId] == address(0), "Wallet already assigned");
        creatorWallets[channelId] = wallet;

        // Transfer any pending balance
        uint256 pending = pendingBalances[channelId];
        if (pending > 0) {
            pendingBalances[channelId] = 0;
            pyUSD.transfer(wallet, pending);
            emit BalanceClaimed(channelId, wallet, pending);
        }

        emit CreatorWalletAssigned(channelId, wallet);
    }

    // Users pay creators
    function payCreator(string calldata channelId, uint256 amount) external whenNotPaused {
        require(amount > 0, "Amount must be > 0");
        address creator = creatorWallets[channelId];

        // Transfer PYUSD from sender to this contract first
        require(pyUSD.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        if (creator != address(0)) {
            // Direct transfer to creator if wallet is set
            pyUSD.transfer(creator, amount);
            emit PaymentSent(channelId, msg.sender, amount, true);
        } else {
            // Store in pendingBalances if creator wallet not assigned
            pendingBalances[channelId] += amount;
            emit PaymentSent(channelId, msg.sender, amount, false);
        }
    }

    // Creator can claim pending balance
    function claimPending(string calldata channelId) external whenNotPaused {
        address wallet = creatorWallets[channelId];
        require(wallet == msg.sender, "Not your wallet");
        uint256 pending = pendingBalances[channelId];
        require(pending > 0, "No balance to claim");

        pendingBalances[channelId] = 0;
        pyUSD.transfer(wallet, pending);
        emit BalanceClaimed(channelId, wallet, pending);
    }
}
