import axiosClient from "./axiosClient"

const boardApi = {
    create: () => axiosClient.post('boards'),
    getAll: () => axiosClient.get('boards'),
    updatePositoin: (params) => axiosClient.put('boards', params),
    getOne: (id) => axiosClient.get(`boards/${id}`),
    delete: (id) => axiosClient.delete(`boards/${id}`),
}

export default boardApi