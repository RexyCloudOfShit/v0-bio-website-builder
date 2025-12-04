"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

interface ColorPickerProps {
  value: string
  onChange: (value: string) => void
  label?: string
  className?: string
}

const PRESET_COLORS = [
  "#ffffff",
  "#000000",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f43f5e",
  "#14b8a6",
  "#6366f1",
  "#a855f7",
  "#d946ef",
]

export function ColorPicker({ value, onChange, label, className }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [localValue, setLocalValue] = useState(value)
  const [rgbMode, setRgbMode] = useState(false)
  const rgbIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const hueRef = useRef(0)

  useEffect(() => {
    if (!rgbMode) {
      setLocalValue(value)
    }
  }, [value, rgbMode])

  useEffect(() => {
    if (rgbMode) {
      rgbIntervalRef.current = setInterval(() => {
        hueRef.current = (hueRef.current + 2) % 360
        const color = `hsl(${hueRef.current}, 100%, 50%)`
        setLocalValue(color)
        onChange(color)
      }, 50)
    } else {
      if (rgbIntervalRef.current) {
        clearInterval(rgbIntervalRef.current)
        rgbIntervalRef.current = null
      }
    }

    return () => {
      if (rgbIntervalRef.current) {
        clearInterval(rgbIntervalRef.current)
      }
    }
  }, [rgbMode, onChange])

  const handleColorChange = (newColor: string) => {
    setRgbMode(false)
    setLocalValue(newColor)
    onChange(newColor)
  }

  const getHexColor = (color: string) => {
    if (color.startsWith("#") && (color.length === 7 || color.length === 4)) {
      return color
    }
    if (color.startsWith("hsl")) {
      return "#ffffff"
    }
    if (color.startsWith("rgba") || color.startsWith("rgb")) {
      const match = color.match(/\d+/g)
      if (match && match.length >= 3) {
        const r = Number.parseInt(match[0]).toString(16).padStart(2, "0")
        const g = Number.parseInt(match[1]).toString(16).padStart(2, "0")
        const b = Number.parseInt(match[2]).toString(16).padStart(2, "0")
        return `#${r}${g}${b}`
      }
    }
    return "#ffffff"
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-2 w-full px-3 py-2 rounded-md border border-border bg-background hover:bg-muted transition-colors">
            <div
              className={cn("w-6 h-6 rounded-md border border-border shadow-sm", rgbMode && "animate-pulse")}
              style={{
                backgroundColor: localValue,
                backgroundImage: rgbMode
                  ? "linear-gradient(90deg, #ff0000, #ff8000, #ffff00, #00ff00, #00ffff, #0000ff, #8000ff, #ff0080, #ff0000)"
                  : undefined,
              }}
            />
            <span className="text-sm font-mono flex-1 text-left text-foreground">
              {rgbMode ? "RGB Mode" : localValue}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3 bg-popover border-border" align="start">
          <div className="space-y-3">
            <Button
              variant={rgbMode ? "default" : "outline"}
              size="sm"
              className="w-full gap-2"
              onClick={() => setRgbMode(!rgbMode)}
            >
              <Sparkles className="w-4 h-4" />
              RGB Rainbow Mode
            </Button>

            {!rgbMode && (
              <>
                {/* Native color input with dark border */}
                <div className="relative rounded-lg overflow-hidden border border-border">
                  <input
                    type="color"
                    value={getHexColor(localValue)}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-full h-24 cursor-pointer border-0 p-0 bg-transparent"
                    style={{ colorScheme: "dark" }}
                  />
                </div>

                {/* Hex input with dark mode */}
                <Input
                  value={localValue}
                  onChange={(e) => handleColorChange(e.target.value)}
                  placeholder="#ffffff"
                  className="font-mono text-sm bg-background text-foreground border-border"
                />

                {/* Preset colors */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Presets</p>
                  <div className="grid grid-cols-5 gap-1.5">
                    {PRESET_COLORS.map((color) => (
                      <button
                        key={color}
                        className={cn(
                          "w-8 h-8 rounded-md border-2 transition-all hover:scale-110",
                          localValue === color ? "border-primary ring-2 ring-primary/20" : "border-border",
                        )}
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          handleColorChange(color)
                          setIsOpen(false)
                        }}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
