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
    <div style={{ textAlign: "center" }}>
      {!account && (
        <button 
          onClick={handleConnect} 
          style={{ 
            padding: "15px 30px",
            fontSize: "1.2rem",
            backgroundColor: "#f6851b",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
            marginBottom: "20px"
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#e2761b";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.15)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#f6851b";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
          }}
        >
          Connect MetaMask
        </button>
      )}
      {account && (
        <div style={{
          padding: "20px",
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          border: "1px solid rgba(76, 175, 80, 0.5)",
          borderRadius: "8px",
          color: "white",
          fontSize: "1.1rem",
          marginBottom: "20px"
        }}>
          ✅ Connected: {account}
        </div>
      )}
      {error && (
        <div style={{ 
          color: "white",
          backgroundColor: "rgba(244, 67, 54, 0.2)",
          border: "1px solid rgba(244, 67, 54, 0.5)",
          borderRadius: "8px",
          padding: "15px",
          marginTop: "20px",
          fontSize: "1rem"
        }}>
          {error}
        </div>
      )}
    </div>
  );
}
