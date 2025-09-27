import { ethers } from "ethers";
import { getSigner } from './wallet';
import YTPayABI from "../YTPay.json"; // make sure ABI is here

const CONTRACT_ADDRESS = "0x6b4C27bDebBd8D6902F8F26ae9D48D93Ed28872F";

// Get contract instance
export const getContract = async () => {
  const signer = await getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, YTPayABI, signer);
};

// Call pay function
export const payChannel = async (channelId, amount) => {
  const contract = await getContract();
  const amountInUnits = ethers.parseUnits(amount.toString(), 6); // pyUSDC 6 decimals
  const tx = await contract.pay(channelId, amountInUnits);
  const receipt = await tx.wait();
  return receipt;
};

// Get channel info
export const getChannelInfo = async (channelId) => {
  const contract = await getContract();
  return await contract.getChannel(channelId);
};
