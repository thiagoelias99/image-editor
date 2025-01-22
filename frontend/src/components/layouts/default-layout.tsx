import { Outlet } from "react-router"
import AppSidebar from "../sidebar"
import { SidebarProvider } from "../ui/sidebar"
import AppHeader from "../header"

export default function DefaultLayout() {
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
