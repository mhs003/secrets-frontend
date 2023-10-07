import axios from "axios";

const baseURL = "http://localhost:4000";
// const baseURL = "http://192.168.43.58:4000";

const API = axios.create({
    baseURL: baseURL,
    // timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' }
});

const authAPI = axios.create({
    baseURL: baseURL + "/api/v1/auth",
    // timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' }
});

const secretsAPI = axios.create({
    baseURL: baseURL + "/api/v1/secrets",
    // timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' }
});

export default API;
export { authAPI, secretsAPI };
