"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FileUploadProps {
  value?: string | null
  onChange: (url: string | null) => void
  accept?: string
  type?: "image" | "video" | "audio"
}

export function FileUpload({ value, onChange, accept, type = "image" }: FileUploadProps) {
  const [mode, setMode] = useState<"file" | "url">("file")
  const [urlInput, setUrlInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => onChange(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleUrl = () => {
    if (urlInput) {
      onChange(urlInput)
      setUrlInput("")
    }
  }

  const defaultAccept = type === "image" ? "image/*" : type === "video" ? "video/*" : "audio/*"

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative">
          {type === "image" && (
            <img src={value || "/placeholder.svg"} alt="" className="w-full h-32 object-cover rounded-lg" />
          )}
          {type === "video" && <video src={value} className="w-full h-32 object-cover rounded-lg" />}
          {type === "audio" && (
            <div className="w-full h-12 bg-white/5 rounded-lg flex items-center px-3 text-white/50 text-sm truncate">
              {value}
            </div>
          )}
          <button
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button
              type="button"
              variant={mode === "file" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setMode("file")}
            >
              <Upload className="w-4 h-4 mr-1" /> Upload
            </Button>
            <Button
              type="button"
              variant={mode === "url" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setMode("url")}
            >
              <LinkIcon className="w-4 h-4 mr-1" /> URL
            </Button>
          </div>

          {mode === "file" ? (
            <div
              onClick={() => inputRef.current?.click()}
              className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center cursor-pointer hover:border-white/40 transition-colors"
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-white/40" />
              <p className="text-sm text-white/40">Click to upload</p>
              <input
                ref={inputRef}
                type="file"
                accept={accept || defaultAccept}
                onChange={handleFile}
                className="hidden"
              />
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://..."
                className="bg-white/5 border-white/10 text-white"
              />
              <Button type="button" onClick={handleUrl}>
                Add
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
