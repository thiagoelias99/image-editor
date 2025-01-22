import { Outlet } from "react-router"

export default function GuestLayout() {
  return (
    <div className="w-full h-screen flex justify-center items-center p-4">
      <Outlet />
    </div>
  )
}
