import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "@/lib/pt-zod"
import { PasswordInput } from "@/components/ui/password-input"
import { useNavigate } from "react-router"
import { useUser } from "@/hooks/use-user"
import { AxiosError } from "axios"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty().min(8),
})

export function LoginForm() {
  const { login, isWaitingForLogin } = useUser()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const navigate = useNavigate()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await login(values)
      navigate('/')
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          form.setError("password", {
            type: "manual",
            message: "Email ou senha incorretos",
          })
          return
        }
        if ((error.response?.status || 0) >= 500) {
          alert("Erro interno no servidor")
          return
        }
      }

      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Seu email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Digite uma senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          isLoading={isWaitingForLogin}
          className="w-full"
          type="submit"
        >Entrar</Button>
      </form>
    </Form>
  )
}
