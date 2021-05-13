import axios from "../../../axios";
import auth from "../../../http/requests/auth"

export default {

    logout({commit}) {
        return new Promise((resolve) => {
            auth.logout()
                .then(response => {

                    // If there's user data in response
                    if (response.value) {

                        commit("LOGOUT");

                    }
                    resolve(response)
                })
        })
    },
}
