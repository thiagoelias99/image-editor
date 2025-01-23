/* eslint-disable @typescript-eslint/no-unused-vars */
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

    return response
  },
  (error) => {
    console.error(error)

    throw error
  }
)

// Function to set the navigation handler
// Add to route components to enable navigation
export const setNavigation = (navigateFunction: NavigateFunction) => {
  navigate = navigateFunction
}

export { api }
