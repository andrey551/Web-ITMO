import axios from 'axios';

const axiosInstance = axios.create ( {
    // baseURL: 'http://localhost:8080/fuck-1.0-SNAPSHOT/api/point',
    baseURL : "http://127.0.0.1:23280/archive/api/point",
    headers:{
        "content-type": "application/json",
    }
})

axiosInstance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("tad"))
    if(token){
        config.headers.Authorization = `${token}`
    }
        
    return config
})

const pointAPI = {
    async getPoints (token) {
        return axiosInstance.post('getList', {
        })
    },

    async checkPoint(x, y, r, token) {
        return axiosInstance.post('addPoint', {x, y, r}, {
        })
    },

    async clearPoint(token) {
        return axiosInstance.post('deletePoint', {
        })
    }
}

export default pointAPI