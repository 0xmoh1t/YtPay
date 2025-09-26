import React from "react";
import { useActiveAccount } from "thirdweb/react"; 
import ConnectWallet from "./pages/connectwallet";
import SearchChannel from './pages/SearchChannel';

export default function App() {
  const account = useActiveAccount();

  return (
    <div>
      <header style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>Welcome</h1>
      <ConnectWallet />
      </header>

      {account && (
        <div style={{ marginTop: "30px" }}>
          <SearchChannel />
        </div>
      )}
    </div>
  );
}
