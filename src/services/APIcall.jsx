import axios from "axios";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export const searchYouTubeChannel = async (query) => {
  const res = await axios.get(`${API_BASE}/api/search?query=${encodeURIComponent(query)}`);
  return res.data;
};
