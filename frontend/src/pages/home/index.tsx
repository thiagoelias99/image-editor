import ImageInputForm from "@/components/image-input-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Imagem</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageInputForm />
        </CardContent>
      </Card>
    </div>
  )
}
