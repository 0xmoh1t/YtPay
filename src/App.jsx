import React, { useState } from "react";
import ConnectWallet from "./pages/ConnectWallet";
import SearchChannel from "./pages/SearchChannel";

export default function App() {
  const [account, setAccount] = useState(null); // store connected wallet

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <header style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>Welcome to YT Pay</h1>
        {/* Connect MetaMask */}
        <ConnectWallet onConnect={setAccount} />
      </header>

      {/* Show Search & Pay section only if wallet connected */}
      {account ? (
        <div style={{ marginTop: "30px" }}>
          <p style={{ textAlign: "center" }}>Connected Wallet: {account}</p>
          <SearchChannel />
        </div>
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px", color: "gray" }}>
          Please connect your MetaMask wallet to search and pay channels.
        </p>
      )}
    </div>
  );
}
