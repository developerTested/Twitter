import axios from "axios"

const TwitterAPI = axios.create({
    baseURL: "/api",
    withCredentials: true,
    timeout: 60 * 1000,
})


export default TwitterAPI