import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;


const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    }
};

export const productAPI = {
    getAllProducts: async () => {
        const response = await api.get('/getproduct');
        return response.data;
    },
    createProduct: async (productData) => {
        const response = await api.post('/postProduct', productData);
        return response.data;
    },
    updateProduct: async (id, productData) => {
        const response = await api.put(`/updateProduct/${id}`, productData);
        return response.data;
    },
    deleteProduct: async (id) => {
        const response = await api.delete(`/deleteProduct/${id}`);
        return response.data;
    }
};

export const orderAPI = {
    createOrder: async (orderData) => {
        const response = await api.post('/orders/create', orderData);
        return response.data;
    },
    getUserOrders: async () => {
        const response = await api.get('/orders/my-orders');
        return response.data;
    },
    getAllOrders: async () => {
        const response = await api.get('/orders/all-orders');
        return response.data;
    }
};

export default api;