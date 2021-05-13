import axios from "../../axios/index.js"

export default {
    login(payload) {
        return axios.post(`login`, payload)
    },
    logout() {
        return axios.post(`logout`)
    },
}
