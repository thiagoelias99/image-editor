/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useNavigate } from "react-router"

export default function LogoutPage() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/login')
  }, [])

  return (
    <div>LogoutPage 2</div>
  )
}
