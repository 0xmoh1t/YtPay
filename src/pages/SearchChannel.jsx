import React, { useState } from "react";
import { searchYouTubeChannel } from '../services/APIcall';

const SearchChannel = () => {
  const [query, setQuery] = useState("");
  const [channel, setChannel] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      <button
        onClick={handleSearch}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {channel && (
        <div
          style={{
            margin: "20px auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "rgba(255,255,255,0.1)",
            padding: "30px",
            borderRadius: "15px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
            width: "400px",
            color: "white",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
          }}
        >
          <img 
            src={channel.logo} 
            alt={channel.name} 
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              marginBottom: "15px",
              border: "2px solid rgba(255,255,255,0.3)"
            }}
          />
          <h3 style={{ 
            color: "#ffff", 
            marginBottom: "10px",
            fontSize: "1.5rem",
            fontWeight: "bold"
          }}>
            {channel.name}
          </h3>
          <p style={{ 
            margin: "5px 0", 
            opacity: "0.8",
            fontSize: "0.9rem"
          }}>
            Channel ID: {channel.id}
          </p>
          <p style={{ 
            margin: "5px 0", 
            fontSize: "1.1rem",
            fontWeight: "600",
            color: "#4CAF50"
          }}>
            Subscribers: {Number(channel.subscribers).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchChannel;
