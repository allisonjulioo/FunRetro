import config from '@/services/config'
import axios from 'axios'
const user_id = localStorage.getItem('uid')
const board_id = localStorage.getItem('bid')
const endpoint = `${config.apiUrl}/api/users/${user_id}/boards/${board_id}/columns`
export default {
  createCard: data => {
    const params = new URLSearchParams()
    params.append('content', data.content)
    return axios({
      method: 'post',
      url: `${endpoint}/${data.id}/cards`,
      data: params
    })
      .then(response => response)
      .catch(error => error)
  },
  updateCard: data => {
    const params = new URLSearchParams()
    params.append('content', data.content)
    params.append('likes', data.likes)
    return axios({
      method: 'patch',
      url: `${endpoint}/${data.column_id}/cards/${data.id}`,
      data: params
    })
      .then(response => response)
      .catch(error => error)
  },
  deleteCard: data => {
    return axios({
      method: 'delete',
      url: `${endpoint}/${data.column_id}/cards/${data.id}`,
    })
      .then(response => response)
      .catch(error => error)
  }
}
