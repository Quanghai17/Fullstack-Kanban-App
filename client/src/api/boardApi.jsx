import axiosClient from "./axiosClient"

const boardApi = {
    create: () => axiosClient.post('boards'),
    getAll: () => axiosClient.get('boards'),
    updatePositoin: (params) => axiosClient.put('boards', params),
}

export default boardApi