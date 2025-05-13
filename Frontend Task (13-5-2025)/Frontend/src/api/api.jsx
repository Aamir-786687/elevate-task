import axios from "axios";

const API_URL = "http://localhost:3000"; 

const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const authService = {
  signup: async (username, password) => {
    const response = await api.post("/signup", { username, password });
    return response.data;
  },
  login: async (username, password) => {
    const response = await api.post("/login", { username, password });
    localStorage.setItem("token", response.data.token);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem("token");
  },
  isAuthenticated: () => {
    return localStorage.getItem("token") !== null;
  },
};

// Notes services
export const notesService = {
  getNotes: async () => {
    const response = await api.get("/notes");
    return response.data;
  },
  createNote: async (title, content) => {
    const response = await api.post("/notes", { title, content });
    return response.data;
  },
  deleteNote: async (id) => {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  },
};

export default api;