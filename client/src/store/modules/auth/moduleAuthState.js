let token = localStorage.getItem('token');
let userInfo = JSON.parse(localStorage.getItem('userInfo'));


export default {
    AppActiveUser: userInfo || '',
    accessToken: token || null
}
