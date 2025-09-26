import { createThirdwebClient } from "thirdweb";
import { sepolia, mainnet, polygon } from "thirdweb/chains";

const chainMap = { sepolia, mainnet, polygon };

const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
const chainName = import.meta.env.VITE_THIRDWEB_CHAIN || "sepolia";

if (!clientId) console.error("❌ Missing VITE_THIRDWEB_CLIENT_ID in .env");

export const chain = chainMap[chainName]; 
export const client = createThirdwebClient({ clientId, chain , persist: false, });
