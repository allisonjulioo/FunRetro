import config from "@/services/config";
import axios from "axios";
const user_id = localStorage.getItem("uid");
const board_id = localStorage.getItem("bid");
const enpoint = `${config.apiUrl}/api/boards/`;
export default {
  getBoards: () => {
    return axios({
      method: "get",
      url: `${enpoint}${user_id}`,
    })
      .then((response) => response)
      .catch((error) => error);
  },
  getBoardById: (board_id) => {
    return axios({
      method: "get",
      url: `${config.apiUrl}/api/board/${board_id}`,
    })
      .then((response) => response)
      .catch((error) => error);
  },

  createBoard: (data) => {
    const params = new URLSearchParams();
    params.append("title", data.title);
    params.append("limit_votes", data.limit_votes);
    params.append("user_id", user_id);
    return axios({
      method: "post",
      url: enpoint,
      data: params,
    })
      .then((response) => response)
      .catch((error) => error);
  },

  updateBoard: (data) => {
    const params = new URLSearchParams();
    params.append("title", data.title);
    params.append("limit_votes", data.limit_votes);
    params.append("user_votes", data.user_votes);

    if (data.in_voting == true) {
      data.in_voting = 1;
    } else data.in_voting = 0;
    params.append("in_voting", data.in_voting);
    return axios({
      method: "patch",
      url: `${enpoint}${user_id}/${board_id}`,
      data: params,
    })
      .then((response) => response)
      .catch((error) => error);
  },
  
  deleteBoard: (board_id) => {
    return axios({
      method: "delete",
      url: `${enpoint}/${board_id}`,
    })
      .then((response) => response)
      .catch((error) => error);
  },
};
