import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
});

// Request Interceptor: Attach JWT Token
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Response Interceptor: Handle 401 Unauthorized
api.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
    }
    return Promise.reject(error);
});

export default api;
