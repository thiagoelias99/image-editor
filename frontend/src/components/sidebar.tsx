"use client"

import { HouseIcon, ImageIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useLocation, useNavigate } from "react-router"

const items = [
  {
    title: "Início",
    url: "/",
    icon: HouseIcon
  },
  {
    title: "Minhas Imagens",
    url: "/imagens",
    icon: ImageIcon,
  }
]

export default function AppSidebar() {
  const { setOpenMobile } = useSidebar()
  const { pathname } = useLocation()
  const router = useNavigate()

  function handleMenuClick(url: string) {
    setOpenMobile(false)
    router(url)
  }

  return (
    <Sidebar collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{import.meta.env.VITE_APP_NAME}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.url)}
                    onClick={() => handleMenuClick(item.url)}
                    className="py-6"
                  >
                    {/* <Link href={item.url}> */}
                    <item.icon />
                    <span className="text-base">{item.title}</span>
                    {/* </Link> */}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}