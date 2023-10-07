import axios from "axios";

const baseURL = "https://secrets-api.fly.dev";

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
