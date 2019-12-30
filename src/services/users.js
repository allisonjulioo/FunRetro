import config from '@/services/config'
import axios from 'axios'
const enpoint = `${config.apiUrl}/api/users`
export default {
  getUsers: () => {
    return axios({
      method: 'get',
      url: `${enpoint}/${user_id}`
    })
      .then(response => response)
      .catch(error => error)
  },
  getUserById: user_id => {
    return axios({
      method: 'get',
      url: `${config.apiUrl}/api/users/${user_id}`
    })
      .then(response => response)
      .catch(error => error)
  },
  createUser: data => {
    const params = new URLSearchParams()
    params.append('title', data.title)
    params.append('limit_votes', data.limit_votes)
    params.append('user_id', user_id)
    return axios({
      method: 'post',
      url: `${enpoint}/`,
      data: params
    })
      .then(response => response)
      .catch(error => error)
  },
  updateUser: data => {
    const params = new URLSearchParams()
    params.append('title', data.title)
    params.append('limit_votes', data.limit_votes)
    return axios({
      method: 'patch',
      url: `${enpoint}/${user_id}/${data.board_id}`,
      data: params
    })
      .then(response => response)
      .catch(error => error)
  },
  deleteUser: board_id => {
    return axios({
      method: 'delete',
      url: `${enpoint}/${user_id}/${board_id}`
    })
      .then(response => response)
      .catch(error => error)
  }
}
