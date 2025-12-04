"use client"

import { useState, useRef, useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ColorPickerProps {
  value?: string | null
  onChange: (value: string) => void
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const color = value || "#ffffff"
  const [hex, setHex] = useState(color)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setHex(color)
  }, [color])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="w-10 h-10 rounded-lg border border-white/20 cursor-pointer"
          style={{ backgroundColor: color }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3 bg-[#1a1a1a] border-white/10">
        <div className="space-y-3">
          <input
            ref={inputRef}
            type="color"
            value={color}
            onChange={(e) => {
              setHex(e.target.value)
              onChange(e.target.value)
            }}
            className="w-full h-32 cursor-pointer rounded border-0"
          />
          <input
            type="text"
            value={hex}
            onChange={(e) => {
              setHex(e.target.value)
              if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                onChange(e.target.value)
              }
            }}
            className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white text-sm font-mono"
            placeholder="#ffffff"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
