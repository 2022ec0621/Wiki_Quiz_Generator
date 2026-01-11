import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getHistory = () =>
  axios.get(`${API}/history`);

export const deleteHistory = (id) =>
  axios.delete(`${API}/history/${id}`);
