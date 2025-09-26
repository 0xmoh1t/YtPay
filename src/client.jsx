import { createThirdwebClient } from "thirdweb";

// ✅ Ensure you have VITE_TEMPLATE_CLIENT_ID set in your .env
const clientId = import.meta.env.VITE_TEMPLATE_CLIENT_ID;

if (!clientId) {
  console.error("❌ Missing VITE_TEMPLATE_CLIENT_ID in .env file");
}

export const client = createThirdwebClient({
  clientId,
});
