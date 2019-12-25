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
  }
}
