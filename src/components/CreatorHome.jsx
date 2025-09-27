import React, { useState } from "react";
import { MyNavbar } from "./MyNavbar";
import { useActiveAccount } from "thirdweb/react";
import ConnectWallet from "../pages/connectWallet";
import SearchChannel from "../pages/SearchChannel";

function CreatorHome() {
  const account = useActiveAccount();
  const [isCreatorLoggedIn, setIsCreatorLoggedIn] = useState(false);

  const handleLoginAsCreator = () => {
    setIsCreatorLoggedIn(true);
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100%", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      {/* Navbar */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <MyNavbar
          theme="dark"
          brand="YT Pay"
          navLink3="About Us"
          navLink4="Extra"
          dropdownTitle="Wallet"
          dropDownAction_1="My Profile"
          dropDownAction_3=" Deposit / Withdraw"
          isCreatorLoggedIn={isCreatorLoggedIn}
          onLoginAsCreator={handleLoginAsCreator}
        />
      </div>

      {/* Welcome and Connect Wallet Section */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>Hi there,</h1>
        <ConnectWallet />
      </div>

      {/* Search Channel Section - Only show if connected */}
      {account && (
        <div style={{ marginTop: "30px" }}>
          <SearchChannel />
        </div>
      )}

      {/* Main Content */}
      <div style={{ padding: "20px", color: "white", marginTop: "100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
          <div style={{ 
            background: "rgba(255,255,255,0.1)", 
            padding: "20px", 
            borderRadius: "10px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)"
          }}>
            <h3 style={{ color: "#ffff", marginBottom: "15px" }}>Top Creators</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>Creator 1</li>
              <li style={{ padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>Creator 2</li>
              <li style={{ padding: "8px 0" }}>Creator 3</li>
            </ul>
          </div>

          <div style={{ 
            background: "rgba(255,255,255,0.1)", 
            padding: "20px", 
            borderRadius: "10px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)"
          }}>
            <h3 style={{ color: "#ffff", marginBottom: "15px" }}>Top Contributors</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>Contributor 1</li>
              <li style={{ padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>Contributor 2</li>
              <li style={{ padding: "8px 0" }}>Contributor 3</li>
            </ul>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default CreatorHome;