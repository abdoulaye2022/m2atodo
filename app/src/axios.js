import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    timeout: 20000
});

// Ajouter un intercepteur pour chaque requête sortante
instance.interceptors.request.use(function (config) {
    // Récupérer le token depuis le localStorage
    const token = localStorage.getItem('token');
    
    // Ajouter le token à l'en-tête Authorization si disponible
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default instance;