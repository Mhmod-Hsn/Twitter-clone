import axios from "../../../axios";

export default {
    SET_BEARER(state, payload) {
        state.accessToken = payload;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + payload;
        localStorage.setItem("token", payload);
    },

    // Updates user info in state and localstorage
    UPDATE_USER_INFO(state, payload) {
        // Store data in localStorage
        localStorage.setItem("userInfo", JSON.stringify(payload));

        state.AppActiveUser = payload;
    },

    // Updates user info in state and localstorage
    toggleFollow(state, payload) {
        let index = state.AppActiveUser.following.indexOf(payload)
        if (index > -1){
            state.AppActiveUser.following.splice(index,1)
        } else {
            state.AppActiveUser.following.push(payload)
        }
    },


    LOGOUT(state) {
        state.accessToken = null;
        state.AppActiveUser = null;
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        axios.defaults.headers.common['Authorization'] = '';
    },
}
