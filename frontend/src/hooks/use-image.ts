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
      await api.post<IImage>("/images", formData)

      queryClient.invalidateQueries({ queryKey: ["images"] })

    },
  })

  const { mutateAsync: deleteImage, isPending: isDeletingImage } = useMutation({
    mutationKey: ["deleteImage"],
    mutationFn: async (imageId: string) => {
      await api.delete<IImage>(`/images/${imageId}`)

      queryClient.invalidateQueries({ queryKey: ["images"] })
    },
  })

  return {
    images,
    isLoadingImages,
    uploadImage,
    isUploadingImage,
    deleteImage,
    isDeletingImage
  }
}