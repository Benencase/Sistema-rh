// frontend/src/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://backend-va3b.onrender.com", // URL do seu backend no Render
});
