import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"

export default function ImagesPage() {
  const images = [
    {
      id: 1,
      url: 'https://github.com/thiagoelias99.png',
      title: 'Image 1',
      alt: 'Image 1 Description'
    },
    {
      id: 2,
      url: 'https://github.com/thiagoelias99.png',
      title: 'Image 2',
      alt: 'Image 2 Description'
    },
    {
      id: 3,
      url: 'https://github.com/thiagoelias99.png'
    }
  ]

  return (
    <div>
      <CardTitle>Minhas Imagens</CardTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {images.map((image) => (
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
