import axios from "axios"
import { NavigateFunction } from "react-router"

let navigate: NavigateFunction

// Create axios client
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
})

// Add a request interceptor
api.interceptors.request.use((request) => {
  const token = localStorage.getItem("ACCESS_TOKEN")
  request.headers.Authorization = `Bearer ${token}`
  return request
})

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Save the token in the local storage
    if (response.data.token) {
      localStorage.setItem("ACCESS_TOKEN", response.data.token)
    }
    return response
  },
  (error) => {
    console.error(error)

    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("ACCESS_TOKEN")
        if (navigate) navigate("/login") // Navigate to login page
      } else if (error.response.status === 404) {
        if (navigate) navigate("/404") // Navigate to 404 page
      }
    }

    throw error
  }
)

// Function to set the navigation handler
// Add to route components to enable navigation
export const setNavigation = (navigateFunction: NavigateFunction) => {
  navigate = navigateFunction
}

export { api }
