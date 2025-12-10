"use client"

import type React from "react"

import { useCallback, useState } from "react"
import { Upload, X, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FileUploadProps {
  value?: {
    bytes?: string
    type?: string
    name?: string
    size?: number
  }
  onChange: (file: { bytes: string; type: string; name: string; size: number } | undefined) => void
  accept?: string
  maxSize?: number // in MB
}

export function FileUpload({ value, onChange, accept = "image/*", maxSize = 5 }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(
    value?.bytes ? `data:${value.type};base64,${value.bytes}` : null,
  )

  const handleFile = useCallback(
    async (file: File) => {
      setError(null)

      // Validate file type
      if (accept && !file.type.match(accept.replace("*", ".*"))) {
        setError(`Please upload a valid file (${accept})`)
        return
      }

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File size must be less than ${maxSize}MB`)
        return
      }

      // Convert to Base64
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        // Extract base64 data (remove data:mime;base64, prefix)
        const base64Data = result.split(",")[1]

        // Set preview for images
        if (file.type.startsWith("image/")) {
          setPreview(result)
        }

        onChange({
          bytes: base64Data,
          type: file.type,
          name: file.name,
          size: file.size,
        })
      }
      reader.readAsDataURL(file)
    },
    [accept, maxSize, onChange],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  const handleRemove = useCallback(() => {
    setPreview(null)
    setError(null)
    onChange(undefined)
  }, [onChange])

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative rounded-lg border border-border overflow-hidden">
          <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-48 object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
          {value?.name && (
            <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-2 text-sm">
              <p className="truncate font-medium">{value.name}</p>
              <p className="text-muted-foreground text-xs">
                {(value.size! / 1024).toFixed(1)} KB • {value.type}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 transition-colors",
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50",
            error && "border-destructive",
          )}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <div className="p-3 rounded-full bg-muted">
              {accept.includes("image") ? (
                <ImageIcon className="h-6 w-6 text-muted-foreground" />
              ) : (
                <Upload className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="font-medium">Drop your file here or click to browse</p>
              <p className="text-sm text-muted-foreground">
                {accept.replace("/*", "s")} up to {maxSize}MB
              </p>
            </div>
          </div>
        </div>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
