import config from '@/services/config'
import axios from 'axios'
const user_id = localStorage.getItem('uid')
const endpoint = `${config.apiUrl}/api/columns`
export default {
  getColumns: column_id => {
    return axios({
      method: 'get',
      url: `${endpoint}/${user_id}/${column_id}`
    })
      .then(response => response)
      .catch(error => error)
  },
  createColumn: data => {
    const params = new URLSearchParams()
    params.append('title', data.title)
    params.append('color', data.color)
    return axios({
      method: 'post',
      url: `${endpoint}/${user_id}/${data.board_id}`,
      data: params
    })
      .then(response => response)
      .catch(error => error)
  },
  updateColumn: data => {
    const params = new URLSearchParams()
    params.append('title', data.title)
    params.append('color', data.color)
    return axios({
      method: 'patch',
      url: `${endpoint}/${data.column_id}`,
      data: params
    })
      .then(response => response)
      .catch(error => error)
  },
  deleteColumn: column_id => {
    return axios({
      method: 'delete',
      url: `${endpoint}/${column_id}`
    })
      .then(response => response)
      .catch(error => error)
  },
}
