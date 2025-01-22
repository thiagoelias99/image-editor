import { cn } from "@/lib/utils"
import { ImageUpIcon, XIcon } from "lucide-react"
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ClassNameValue } from "tailwind-merge"
import { Button } from "./button"

interface ImageDropzoneProps {
  onChange: (file: File | null) => void
  onDropRejected?: () => void
  className?: ClassNameValue
}

export default function ImageInput({ onChange, onDropRejected, className }: ImageDropzoneProps) {
  const [preview, setPreview] = useState<string | undefined>(undefined)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/png': [], 'image/jpeg': [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0] || null
      onChange(file)
      if (file) {
        setPreview(URL.createObjectURL(file))
      } else {
        setPreview(undefined)
      }
    },
    onDropRejected: () => {
      if (onDropRejected) {
        onDropRejected()
      } else {
        alert('Arquivo inválido. Por favor, envie uma imagem.')
      }
    }
  })

  return (
    <div
      {...getRootProps()}
      className={cn("w-full h-96 p-4 flex justify-center items-center border-2 border-dashed rounded-lg", isDragActive ? 'border-primary bg-muted-foreground/10' : 'border-muted-foreground'
        , className)}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="w-full h-full relative">
          <img
            src={preview}
            alt="Pré-visualização"
            className="w-full h-full object-contain"
          />
          <Button
            variant="destructive"
            size="icon"
            onClick={e => {
              e.stopPropagation()
              onChange(null)
              setPreview(undefined)
            }}
            className="absolute top-0 right-0"
          ><XIcon /></Button>
        </div>
      ) : isDragActive ? (
        <p>Solte a imagem aqui...</p>
      ) : (
        <div className="w-full flex flex-col items-center gap-6">
          <ImageUpIcon className="w-12 h-12 text-muted-foreground" />
          <p className="text-center text-muted-foreground">Arraste e solte uma imagem PNG ou JPEG ou clique para selecionar</p>
        </div>
      )}
    </div>
  )
}