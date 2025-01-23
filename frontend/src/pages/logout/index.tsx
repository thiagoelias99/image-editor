/* eslint-disable react-hooks/exhaustive-deps */
import { api } from "@/lib/api"
import { useEffect } from "react"
import { useNavigate } from "react-router"

export default function LogoutPage() {
  const navigate = useNavigate()

  useEffect(() => {
    api.post("/logout")
      .finally(() => {
        localStorage.removeItem("ACCESS_TOKEN")
        navigate("/login")
      })
  }, [])

  return (
    <div>LogoutPage 2</div>
  )
}
