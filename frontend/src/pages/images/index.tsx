import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { useImages } from "@/hooks/use-image"
import { Loader2Icon } from "lucide-react"

export default function ImagesPage() {
  const { images, isLoadingImages } = useImages()

  if (isLoadingImages) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2Icon size={48} className="animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div>
      <CardTitle>Minhas Imagens</CardTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {images?.map((image) => (
          <Card key={image.id}>
            <CardContent className="flex flex-col gap-2 p-4">
              <img src={image.url} alt={image.alt} className="rounded w-full h-64" />
              <CardTitle>{image.title}</CardTitle>
              <CardDescription>{image.alt}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
