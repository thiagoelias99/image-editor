import { Link } from "react-router"
import { LoginForm } from "./partials/login-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function LoginPage() {
  return (
    <div className="flex flex-col w-full justify-center items-center gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para acessar a plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <span>Não possui conta? <Link to="/cadastro"><b>Cadastre</b></Link></span>
    </div>
  )
}
