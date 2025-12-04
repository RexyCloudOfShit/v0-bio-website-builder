"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { X, FileImage, FileVideo, FileAudio, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  accept: "image" | "video" | "audio"
  value?: string
  onChange: (url: string) => void
  className?: string
}

export function FileUpload({ accept, value, onChange, className }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [urlInput, setUrlInput] = useState("")
  const [showUrlInput, setShowUrlInput] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const acceptMap = {
    image: "image/*",
    video: "video/mp4,video/webm",
    audio: "audio/mp3,audio/mpeg,audio/wav,audio/ogg",
  }

  const IconMap = {
    image: FileImage,
    video: FileVideo,
    audio: FileAudio,
  }

  const Icon = IconMap[accept]

  const handleFile = useCallback(
    async (file: File) => {
      setIsLoading(true)
      setError(null)

      try {
        // Convert to base64 data URL for preview
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          onChange(result)
          setIsLoading(false)
        }
        reader.onerror = () => {
          setError("Failed to read file")
          setIsLoading(false)
        }
        reader.readAsDataURL(file)
      } catch {
        setError("Failed to process file")
        setIsLoading(false)
      }
    },
    [onChange],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) {
        handleFile(file)
      }
    },
    [handleFile],
  )

  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      // Only handle paste if this container is focused or no other input is focused
      const activeElement = document.activeElement
      const isInputFocused = activeElement?.tagName === "INPUT" || activeElement?.tagName === "TEXTAREA"

      if (isInputFocused && !containerRef.current?.contains(activeElement)) {
        return
      }

      const items = e.clipboardData?.items
      if (!items) return

      for (const item of items) {
        if (item.type.startsWith(accept === "image" ? "image/" : accept === "video" ? "video/" : "audio/")) {
          const file = item.getAsFile()
          if (file) {
            e.preventDefault()
            handleFile(file)
            return
          }
        }
      }

      // Check for URL in clipboard
      const text = e.clipboardData?.getData("text")
      if (text && (text.startsWith("http://") || text.startsWith("https://"))) {
        if (containerRef.current?.contains(document.activeElement)) {
          onChange(text)
        }
      }
    }

    window.addEventListener("paste", handlePaste)
    return () => window.removeEventListener("paste", handlePaste)
  }, [accept, handleFile, onChange])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleUrlSubmit = () => {
    if (urlInput && (urlInput.startsWith("http://") || urlInput.startsWith("https://"))) {
      onChange(urlInput)
      setUrlInput("")
      setShowUrlInput(false)
    }
  }

  return (
    <div ref={containerRef} className={cn("space-y-2", className)}>
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-4 transition-colors bg-background",
          isDragging ? "border-primary bg-primary/10" : "border-border hover:border-primary/50",
          isLoading && "opacity-50 pointer-events-none",
        )}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        tabIndex={0}
      >
        <input ref={inputRef} type="file" accept={acceptMap[accept]} onChange={handleInputChange} className="hidden" />

        {value ? (
          <div className="relative">
            {accept === "image" && (
              <img src={value || "/placeholder.svg"} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
            )}
            {accept === "video" && <video src={value} className="w-full h-32 object-cover rounded-lg" muted />}
            {accept === "audio" && (
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <FileAudio className="w-8 h-8 text-muted-foreground" />
                <span className="text-sm truncate flex-1 text-foreground">Audio file loaded</span>
              </div>
            )}
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 w-6 h-6"
              onClick={() => onChange("")}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-4">
            <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => inputRef.current?.click()}>
              <div className="p-3 rounded-full bg-muted">
                <Icon className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Drop {accept} here or click to upload</p>
                <p className="text-xs text-muted-foreground mt-1">Or paste from clipboard (Ctrl+V)</p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="mt-2 text-xs"
              onClick={(e) => {
                e.stopPropagation()
                setShowUrlInput(!showUrlInput)
              }}
            >
              <Upload className="w-3 h-3 mr-1" />
              Use URL instead
            </Button>

            {showUrlInput && (
              <div className="flex gap-2 w-full mt-2" onClick={(e) => e.stopPropagation()}>
                <Input
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://..."
                  className="text-sm bg-background text-foreground border-border"
                  onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()}
                />
                <Button size="sm" onClick={handleUrlSubmit}>
                  Add
                </Button>
              </div>
            )}
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-lg">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
