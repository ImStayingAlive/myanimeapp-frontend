import axios from "axios"

let api = axios.create({
    baseURL: 'https://rest.necrocloud.eu',
    timeout: 3000,
    headers: {'Content-Type': 'application/json'}
});

export default api