import axios from "axios";

const API = "http://127.0.0.1:8000";

export const getHistory = () =>
  axios.get(`${API}/history`);

export const deleteHistory = (id) =>
  axios.delete(`${API}/history/${id}`);
