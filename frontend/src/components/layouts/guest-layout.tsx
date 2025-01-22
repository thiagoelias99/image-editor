import { Outlet } from "react-router"

export default function GuestLayout() {
  return (
    <div>
      <h1>Guest Layout</h1>
      <Outlet />
    </div>
  )
}
