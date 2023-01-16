import config from "@/services/config";
import axios from "axios";
export default {
  login: (email, password) => {
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);
    return axios({
      method: "post",
      url: `${config.apiUrl}/api/auth/`,
      data: params,
    })
      .then((response) => response)
      .catch((error) => error);
  },
  signup: (user) => {
    const params = new URLSearchParams();
    params.append("name", user.name);
    params.append("email", user.email);
    params.append("password", user.password);
    return axios({
      method: "post",
      url: `${config.apiUrl}/api/users/`,
      data: params,
    })
      .then((response) => response)
      .catch((error) => error);
  },
  getUser: () => {
    return axios({
      method: "get",
      url: `${config.apiUrl}/api/users/${localStorage.getItem("uid")}`,
    })
      .then((response) => response)
      .catch((error) => error);
  },
};
