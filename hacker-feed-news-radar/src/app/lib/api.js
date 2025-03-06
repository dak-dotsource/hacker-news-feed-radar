import axios from "axios";

const api = axios.create({
  baseURL: "https://api.hnpwa.com/v0/news/",
});

export default api;

// https://api.hnpwa.com/v0/news/1.json
