import axios from "axios";

axios.defaults.baseURL = 'https://inventory-management-system-be.vercel.app';
axios.defaults.withCredentials = true;

export default axios;
