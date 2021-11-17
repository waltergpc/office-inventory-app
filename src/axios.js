import axios from "axios"

axios.defaults.baseURL = "https://inventory-api-1.herokuapp.com/api/v1"

axios.interceptors.request.use(function (config) {
  const user = localStorage.getItem("user")
  if (user) {
    const { token } = JSON.parse(localStorage.getItem("user"))
    config.headers.authorization = `Bearer ${token}`
    return config
  }
  return config
})
