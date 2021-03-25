import axios from 'axios';

//https://api.hgbrasil.com/weather?key=e0dfc7e7&lat=-23.682&lon=-46.875

export const key = 'e0dfc7e7';

const api = axios.create({
    baseURL: 'https://api.hgbrasil.com'
});

export default api;