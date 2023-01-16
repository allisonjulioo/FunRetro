import config from "@/services/config";
import axios from "axios";
const user_id = localStorage.getItem("uid");
const board_id = localStorage.getItem("bid");
const endpoint = `${config.apiUrl}/api/columns/${user_id}`;

export default {
  getColumns: () => {
    return axios({
      method: "get",
      url: `${endpoint}/${board_id}`,
    })
      .then((response) => response)
      .catch((error) => error);
  },
  createColumn: (data) => {
    const params = new URLSearchParams();
    params.append("title", data.title);
    params.append("color", data.color);
    return axios({
      method: "post",
      url: `${endpoint}/${data.id}/columns`,
      data: params,
    })
      .then((response) => response)
      .catch((error) => error);
  },
  updateColumn: (data) => {
    const params = new URLSearchParams();
    params.append("title", data.title);
    params.append("color", data.color);
    return axios({
      method: "patch",
      url: `${endpoint}/${data.board_id}/columns/${data.id}`,
      data: params,
    })
      .then((response) => response)
      .catch((error) => error);
  },
  deleteColumn: (data) => {
    return axios({
      method: "delete",
      url: `${endpoint}/${data.board_id}/columns/${data.id}`,
    })
      .then((response) => response)
      .catch((error) => error);
  },
};
