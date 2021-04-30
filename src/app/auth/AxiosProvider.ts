import axios from "axios"

let api = axios.create({
    baseURL: 'https://api.myanime.app',
    timeout: 3000,
    headers: {'Content-Type': 'application/json'}
});

export default api