export default {
  isLoggedIn: function () {
    return localStorage.getItem('token')
  },
  login: function (token) {
    localStorage.setItem('token', token)
  },
  logout: function () {
    localStorage.removeItem('token')
  }
}
