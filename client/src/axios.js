// axios
import axios from "axios"

let token = localStorage.getItem("token")
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token
}

const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://iti-nodejs.herokuapp.com/api"

const instance = axios.create({
  baseURL: URL,
  timeout: 30000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
})

export default instance
