
import { ethers } from "ethers";
import YTPayABI from "../YTPay.json";

const CONTRACT_ADDRESS = "0x6b4C27bDebBd8D6902F8F26ae9D48D93Ed28872F";
const PYUSDC_ADDRESS = "0x637A1259C6afd7E3AdF63993cA7E58BB438aB1B1"; // replace with your pyUSDC testnet address

// Connect MetaMask
export const connectWallet = async () => {
  if (!window.ethereum) throw new Error("MetaMask not installed");
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  return accounts[0];
};

// Get contract instance
export const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not installed");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, YTPayABI, signer);
  return contract;
};

// Pay channel (includes approval)
export const payChannel = async (channelId, amount) => {
  if (!amount || Number(amount) <= 0) throw new Error("Invalid amount");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // 1️⃣ Approve contract to spend pyUSDC
  const pyUSDC = new ethers.Contract(
    PYUSDC_ADDRESS,
    ["function approve(address spender, uint256 amount) public returns (bool)"],
    signer
  );

  const amountInUnits = ethers.utils.parseUnits(amount.toString(), 6); // pyUSDC has 6 decimals
  const approveTx = await pyUSDC.approve(CONTRACT_ADDRESS, amountInUnits);
  await approveTx.wait();

  // 2️⃣ Call pay on YTPay
  const contract = await getContract();
  const tx = await contract.pay(channelId, amountInUnits);
  const receipt = await tx.wait();
  return receipt;
};

// Get channel info
export const getChannelInfo = async (channelId) => {
  const contract = await getContract();
  const info = await contract.getChannel(channelId);
  return info;
};
