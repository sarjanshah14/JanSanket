// src/api.js
import axios from "axios"

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) =>
    error ? prom.reject(error) : prom.resolve(token)
  )
  failedQueue = []
}

// Add access token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Refresh token on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      isRefreshing = true

      try {
        const refresh = localStorage.getItem("refresh")
        const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", { refresh })

        localStorage.setItem("access", res.data.access)

        processQueue(null, res.data.access)

        originalRequest.headers.Authorization = `Bearer ${res.data.access}`
        return api(originalRequest)
      } catch (err) {
        processQueue(err, null)
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        window.location.href = "/login" // or navigate
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
