import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { useImages } from "@/hooks/use-image"
import { Loader2Icon, Trash2Icon } from "lucide-react"

export default function ImagesPage() {
  const { images, isLoadingImages, deleteImage } = useImages()

  if (isLoadingImages) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2Icon size={48} className="animate-spin text-primary" />
      </div>
    )
  }

  async function handleDeleteImage(id: string) {
    try {
      await deleteImage(id)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <CardTitle>Minhas Imagens</CardTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {images?.map((image) => (
          <Card key={image.id}>
            <CardContent className="flex flex-col gap-2 p-4 relative">
              <img src={image.url} alt={image.alt} className="rounded w-full h-64" />
              <CardTitle>{image.title}</CardTitle>
              <CardDescription>{image.alt}</CardDescription>
              <Button
                onClick={() => handleDeleteImage(image.id)}
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
              ><Trash2Icon /></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
