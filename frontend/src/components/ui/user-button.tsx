"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router"

export default function UserButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex gap-1 justify-end items-center'>
        <Avatar className='w-8 h-8'>
          <AvatarImage src="https://github.com/thiagoelias99.png" />
          <AvatarFallback>TE</AvatarFallback>
        </Avatar>
        <p className='ml-1'>Thiago Elias</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>
          <Link to='/logout'>Sair</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}