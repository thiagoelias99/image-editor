import { z } from "@/lib/pt-zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import ImageInput from "./ui/image-input"
import { Input } from "./ui/input"
import { useImages } from "@/hooks/use-image"

const formSchema = z.object({
  image: z
    .instanceof(File, { message: 'O arquivo precisa ser uma imagem.' })
    .refine((file) => file.type.startsWith('image/'), 'O arquivo precisa ser uma imagem.'),
  title: z.string().optional(),
  alt: z.string().optional(),
})

export default function ImageInputForm() {
  const { uploadImage, isUploadingImage } = useImages()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
      title: undefined,
      alt: undefined
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()
    formData.append('image', values.image)
    if (values.title) formData.append('title', values.title)
    if (values.alt) formData.append('alt', values.alt)
    console.log(formData)
    try {
      await uploadImage(formData)

    } catch (error) {
      console.error(error)
    }
  }

  return (
    (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 justify-center items-center">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <ImageInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Título (<i>opcional</i>)</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o título da imagem" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="alt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Descrição (<i>opcional</i>)</FormLabel>
                <FormControl>
                  <Input placeholder="Digite a descrição da imagem para acessibilidade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" isLoading={isUploadingImage}>Enviar</Button>
        </form>
      </Form>
    )
  )
}
