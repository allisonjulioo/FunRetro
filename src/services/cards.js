import config from '@/services/config'
import axios from 'axios'
const user_id = localStorage.getItem('uid')
const endpoint = `${config.apiUrl}/api/cards`
export default {
  getCardsByIdColumn: (board_id, column_id) => {
    return axios({
      method: 'get',
      url: `${endpoint}/${board_id}/${column_id}`
    })
      .then(response => response)
      .catch(error => error)
  },
  createCard: data => {
    const params = new URLSearchParams()
    params.append('content', data.content)
    return axios({
      method: 'post',
      url: `${endpoint}/${data.board_id}/${data.column_id}/${user_id}`,
      data: params
    })
      .then(response => response)
      .catch(error => error)
  },
  updateCard: data => {
    const params = new URLSearchParams()
    params.append('content', data.content)
    return axios({
      method: 'patch',
      url: `${endpoint}/${data.card_id}`,
      data: params
    })
      .then(response => response)
      .catch(error => error)
  },
  deleteCard: card_id => {
    return axios({
      method: 'delete',
      url: `${endpoint}/${card_id}`
    })
      .then(response => response)
      .catch(error => error)
  }
}
