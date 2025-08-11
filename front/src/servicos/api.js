import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  //baseURL: "https://quettaltda.tech/api",
});

api.interceptors.request.use(
  (request) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;