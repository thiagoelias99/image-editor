import { api } from "@/lib/api"
import { IImage } from "@/models/image"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useImages = () => {
  const queryClient = useQueryClient()

  const { data: images, isPending: isLoadingImages } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const { data: responseData } = await api.get<{ data: IImage[] }>("/images")

      return responseData.data
    },
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5 // 5 minutes,
  })

  const { mutateAsync: uploadImage, isPending: isUploadingImage } = useMutation({
    mutationKey: ["uploadImage"],
    mutationFn: async (formData: FormData) => {
      console.log(formData)
      const { data: responseData } = await api.post<IImage>("/images", formData)
      console.log(responseData)

      queryClient.invalidateQueries({ queryKey: ["images"] })

    },
  })

  return {
    images,
    isLoadingImages,
    uploadImage,
    isUploadingImage
  }
}