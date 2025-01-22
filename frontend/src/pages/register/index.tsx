import { Link } from "react-router"
import { RegisterForm } from "./partials/register-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function RegisterPage() {
  return (
    <div className="flex flex-col w-full justify-center items-center gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Cadastro</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para acessar a plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
      <span>Já possui conta? <Link to="/login"><b>Entre</b></Link></span>
    </div>
  )
}
