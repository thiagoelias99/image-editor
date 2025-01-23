import { BrowserRouter, Route, Routes, useNavigate } from "react-router"
import DefaultLayout from "./components/layouts/default-layout"
import GuestLayout from "./components/layouts/guest-layout"
import HomePage from "./pages/home"
import ImagesPage from "./pages/images"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"
import LogoutPage from "./pages/logout"
import { useEffect } from "react"
import { setNavigation } from "./lib/api"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

function AppRoutes() {
  const navigate = useNavigate()

  useEffect(() => {
    setNavigation(navigate) // Pass the navigate function to the API module
  }, [navigate])

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="imagens" element={<ImagesPage />} />
      </Route>
      <Route path="/" element={<GuestLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="cadastro" element={<RegisterPage />} />
      </Route>
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  )
}

