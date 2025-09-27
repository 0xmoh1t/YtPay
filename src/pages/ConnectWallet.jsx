import React, { useState } from "react";
import { connectWallet } from "../services/wallet";

export default function ConnectWallet({ onConnect }) {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");

  const handleConnect = async () => {
    try {
      const acc = await connectWallet();
      setAccount(acc);
      if (onConnect) onConnect(acc);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {!account && (
        <button onClick={handleConnect} style={{ padding: "10px 20px" }}>
          Connect MetaMask
        </button>
      )}
      {account && <p>Connected: {account}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
