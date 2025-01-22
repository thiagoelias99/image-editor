import { BrowserRouter, Route, Routes } from "react-router"
import DefaultLayout from "./components/layouts/default-layout"
import GuestLayout from "./components/layouts/guest-layout"
import HomePage from "./pages/home"
import ImagesPage from "./pages/images"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="imagens" element={<ImagesPage />} />
        </Route>
        <Route path="/" element={<GuestLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="cadastro" element={<RegisterPage />} />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

