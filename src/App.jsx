import React from "react";
import { useActiveAccount } from "thirdweb/react"; 
import ConnectWallet from "./pages/connectwallet";


export default function App() {
  const account = useActiveAccount();

  return (
    <div>
      <header style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>Welcome</h1>
        {!account && <ConnectWallet />}
      </header>

    </div>
  );
}
