import { Outlet, useNavigate } from "react-router"
import AppSidebar from "../sidebar"
import { SidebarProvider } from "../ui/sidebar"
import AppHeader from "../header"
import { useUser } from "@/hooks/use-user"
import { Loader2Icon } from "lucide-react"

export default function DefaultLayout() {
  const { user, isLoadingUser } = useUser()
  const navigate = useNavigate()

  if (!isLoadingUser && !user) {
    navigate('/login')
  }

  if (isLoadingUser) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <Loader2Icon size={64} className="animate-spin text-primary" />
      </div>
    )
  }

  return (
    <SidebarProvider className='flex flow-row w-full' defaultOpen={false}>
      <AppSidebar />
      <div className='w-full'>
        <AppHeader />
        <main className='p-4'>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
