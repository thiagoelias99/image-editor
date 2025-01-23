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
import { api } from "@/lib/api"
import { useNavigate } from "react-router"

const formSchema = z.object({
  fullName: z.string().nonempty().max(255),
  email: z.string().email(),
  password: z.string().nonempty().min(8),
  confirmPassword: z.string().nonempty().min(8),
})

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })
  const navigate = useNavigate()

  function onSubmit(values: z.infer<typeof formSchema>) {
    //compare passwords
    if (values.password !== values.confirmPassword) {
      form.setError('confirmPassword', {
        type: 'manual',
        message: 'As senhas não conferem'
      })
      return
    }

    api.post('/signup', values)
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        console.error(error)

        if (error.response?.status === 409) {
          form.setError('email', {
            type: 'manual',
            message: 'Este email já está em uso'
          })
        }
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmação de Senha</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Seu nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">Cadastrar</Button>
      </form>
    </Form>
  )
}
