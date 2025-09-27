import React, { useState, useEffect } from "react";
import { searchYouTubeChannel } from "../services/APIcall";
import { payChannel, getChannelInfo } from "../services/wallet";
import { ethers } from "ethers";

const SearchChannel = ({ account }) => {
  const [query, setQuery] = useState("");
  const [channel, setChannel] = useState(null);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [balance, setBalance] = useState("0.0");

  // Fetch wallet pyUSDC balance
  const fetchBalance = async () => {
    if (!account) return;
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const pyUSDC_ADDRESS = "<YOUR_pyUSDC_ADDRESS>"; // replace with your pyUSDC testnet address
      const ERC20_ABI = ["function balanceOf(address) view returns (uint256)"];
      const token = new ethers.Contract(pyUSDC_ADDRESS, ERC20_ABI, provider);
      const bal = await token.balanceOf(account);
      setBalance(ethers.utils.formatUnits(bal, 6));
    } catch (err) {
      console.error("Balance fetch error:", err);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [account]);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a channel name");
      return;
    }
    setLoading(true);
    setError("");
    setChannel(null);

    try {
      const data = await searchYouTubeChannel(query);
      setChannel(data);
    } catch (err) {
      setError(err?.response?.data?.error || err.message || "Something went wrong");
    }

    setLoading(false);
  };

  const handlePay = async () => {
    if (!amount || Number(amount) <= 0) {
      setError("Enter a valid amount");
      return;
    }
    if (Number(amount) > Number(balance)) {
      setError("Insufficient pyUSDC balance");
      return;
    }

    setPayLoading(true);
    setError("");
    setSuccess("");

    try {
      const receipt = await payChannel(channel.id, amount);
      setSuccess(`Paid ${amount} pyUSDC to ${channel.name}`);
      setAmount("");
      fetchBalance(); // update balance
    } catch (err) {
      console.error(err);
      setError(err?.data?.message || err.message || "Payment failed");
    }

    setPayLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>YouTube Channel Search</h2>
      <input
        type="text"
        placeholder="Enter channel name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />
      <button onClick={handleSearch} style={{ marginLeft: "10px", padding: "10px 20px" }}>
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {account && <p>Your pyUSDC balance: {balance}</p>}

      {channel && (
        <div
          style={{
            marginTop: "20px",
            display: "inline-block",
            textAlign: "center",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <img src={channel.logo} alt={channel.name} />
          <h3>{channel.name}</h3>
          <p>Channel ID: {channel.id}</p>
          <p>Subscribers: {Number(channel.subscribers).toLocaleString()}</p>

          <div style={{ marginTop: "10px" }}>
            <input
              type="number"
              placeholder="Enter amount pyUSDC"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ padding: "5px 10px", width: "150px", marginRight: "10px" }}
            />
            <button onClick={handlePay} disabled={payLoading} style={{ padding: "5px 15px" }}>
              {payLoading ? "Processing..." : "Pay"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchChannel;
