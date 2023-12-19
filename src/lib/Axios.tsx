import axios from "axios"

export const  AxiosInstance = axios.create({
    baseURL: 'http://10.1.40.227:3000',
    timeout: 10000
})
