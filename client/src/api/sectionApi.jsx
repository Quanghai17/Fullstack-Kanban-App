import axiosClient from './axiosClient'

const sectionApi = {
  getSection: (boardId) => axiosClient.get(`boards/${boardId}/sections/${boardId}`),
  create: (boardId) => axiosClient.post(`boards/${boardId}/sections`),
  update: (boardId, sectionId, params) => axiosClient.put(
    `boards/${boardId}/sections/${sectionId}`,
    params
  ),
  delete: (boardId, sectionId) => axiosClient.delete(`boards/${boardId}/sections/${sectionId}`)
}

export default sectionApi