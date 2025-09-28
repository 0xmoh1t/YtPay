import React, { useState } from "react";
import ConnectWallet from "./pages/ConnectWallet";
import SearchChannel from "./pages/SearchChannel";

export default function App() {
  const [account, setAccount] = useState(null); // store connected wallet

  return (
    <div style={{ 
      fontFamily: "Arial, sans-serif",
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      margin: 0,
      padding: 0,
      boxSizing: "border-box"
    }}>
      {/* Centered Welcome Section */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        width: "100%",
        textAlign: "center",
        padding: "40px 20px",
        boxSizing: "border-box"
      }}>
        <h1 style={{ 
          fontSize: "3rem", 
          marginBottom: "2rem",
          color: "white",
          fontWeight: "bold"
        }}>
          Welcome to YT Pay
        </h1>
        <ConnectWallet onConnect={setAccount} />
      </div>

      {/* Show Search & Pay section only if wallet connected */}
      {account && (
        <div style={{ 
          padding: "10px 20px",
          width: "100%",
          color: "white",
          boxSizing: "border-box"
        }}>
          <SearchChannel />
        </div>
      )}
    </div>
  );
}
