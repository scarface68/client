import axios from "axios"

const Api = axios.create({
    baseURL: "https://sai-chandan-api.onrender.com/api/"
})

export default Api