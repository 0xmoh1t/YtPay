import { ethers } from "ethers";

// Your contract ABI
import YTPayABI from './services/ytpay';

// Sepolia / Arbitrum Sepolia address
const CONTRACT_ADDRESS = "0x6b4C27bDebBd8D6902F8F26ae9D48D93Ed28872F";

export const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not installed");

  // Request account access
  await window.ethereum.request({ method: "eth_requestAccounts" });

  // Provider & signer
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // Contract instance
  const contract = new ethers.Contract(CONTRACT_ADDRESS, YTPayABI, signer);

  return contract;
};

// Call pay function
export const payChannel = async (channelId, amount) => {
  const contract = await getContract();

  // Ensure amount is in correct units (assuming pyUSDC has 6 decimals)
  const amountInUnits = ethers.parseUnits(amount.toString(), 6);

  // Call contract
  const tx = await contract.pay(channelId, amountInUnits);

  // Wait for transaction to be mined
  const receipt = await tx.wait();
  return receipt;
};

// Read channel info
export const getChannelInfo = async (channelId) => {
  const contract = await getContract();
  const info = await contract.getChannel(channelId);
  return info;
};