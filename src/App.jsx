import { ConnectButton } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { sepolia } from "thirdweb/chains";
import { client } from "./client";
import { Route,Routes } from "react-router";
import LandingPage from "./components/LandingPage";
import CreatorHome from "./components/creatorHome";


function App() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <ConnectButton
        accountAbstraction={{
          chain: sepolia, // ✅ Change if you want another chain
          sponsorGas: true,
        }}
        client={client}
        connectModal={{
          showThirdwebBranding: false,
          size: "compact",
        }}
        wallets={[
          inAppWallet({
            auth: {
              options: ["google", "x", "passkey", "phone", "email"],
            },
          }),
        ]}
      />

      <Routes>
        <Route path="/landing1" element={<LandingPage/>} />
        <Route path="/creator" element={<CreatorHome/>}/>
      </Routes>
    </div>
  );
}

export default App;
