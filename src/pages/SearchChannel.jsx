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
        </div>
      )}
    </div>
  );
};

export default SearchChannel;
