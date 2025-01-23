import { api } from "@/lib/api"
import { IUser, IUserLoginDTO, IUserLoginResponseDTO, IUserRegisterDTO } from "@/models/user"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export const useUser = () => {
  const [loggedUser, setLoggedUser] = useState<IUser | undefined>(undefined)
  const queryClient = useQueryClient()

  const { mutateAsync: login, isPending: isWaitingForLogin } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: IUserLoginDTO) => {
      const { data: responseData } = await api.post<IUserLoginResponseDTO>("/login", data)
      localStorage.setItem("ACCESS_TOKEN", responseData.token)
      setLoggedUser({
        id: responseData.user.id,
        name: responseData.user.name,
        email: responseData.user.email
      })
      queryClient.setQueryData(["user"], {
        id: responseData.user.id,
        name: responseData.user.name,
        email: responseData.user.email
      })
    }
  })

  const { mutateAsync: register, isPending: isRegisteringUser } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: IUserRegisterDTO) => {
      await api.post<IUserLoginResponseDTO>("/register", data)
      const { data: responseData } = await api.post<IUserLoginResponseDTO>("/login", {
        email: data.email,
        password: data.password
      })
      localStorage.setItem("ACCESS_TOKEN", responseData.token)
      setLoggedUser({
        id: responseData.user.id,
        name: responseData.user.name,
        email: responseData.user.email
      })
      queryClient.setQueryData(["user"], {
        id: responseData.user.id,
        name: responseData.user.name,
        email: responseData.user.email
      })
    }
  })

  const { data: user, isPending: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data: responseData } = await api.get<IUser>("/user")
      setLoggedUser(responseData)

      return responseData
    }
  })

  return {
    login,
    isWaitingForLogin,
    register,
    isRegisteringUser,
    user,
    isLoadingUser,
  }
}