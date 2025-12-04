"use client"

import type React from "react"

import { useEffect, useState } from "react"
import type { Profile } from "@/lib/types"

interface Props {
  profile: Profile
  containerRef: React.RefObject<HTMLDivElement | null>
}

interface Effect {
  id: number
  x: number
  y: number
}

export function ClickEffect({ profile, containerRef }: Props) {
  const [effects, setEffects] = useState<Effect[]>([])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newEffect = { id: Date.now(), x: e.clientX, y: e.clientY }
      setEffects((prev) => [...prev, newEffect])
      setTimeout(() => {
        setEffects((prev) => prev.filter((ef) => ef.id !== newEffect.id))
      }, 600)
    }

    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [])

  const renderEffect = (effect: Effect) => {
    const size = profile.click_effect_size
    const color = profile.click_effect_color || "#ffffff"
    const style = {
      position: "absolute" as const,
      left: effect.x,
      top: effect.y,
      transform: "translate(-50%, -50%)",
      pointerEvents: "none" as const,
    }

    switch (profile.click_effect_type) {
      case "ripple":
        return (
          <div key={effect.id} style={style} className="animate-ping rounded-full">
            <div
              className="rounded-full"
              style={{
                width: size,
                height: size,
                border: `2px solid ${color}`,
              }}
            />
          </div>
        )
      case "particles":
        return (
          <div key={effect.id} style={style}>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-ping"
                style={{
                  backgroundColor: color,
                  transform: `rotate(${i * 45}deg) translateY(-${size / 2}px)`,
                }}
              />
            ))}
          </div>
        )
      case "hearts":
        return (
          <div key={effect.id} style={style} className="text-2xl animate-ping">
            ❤️
          </div>
        )
      case "stars":
        return (
          <div key={effect.id} style={style} className="text-2xl animate-ping">
            ⭐
          </div>
        )
      case "confetti":
        return (
          <div key={effect.id} style={style}>
            {["🎉", "🎊", "✨"].map((emoji, i) => (
              <span
                key={i}
                className="absolute animate-ping"
                style={{ transform: `rotate(${i * 120}deg) translateY(-${size / 2}px)` }}
              >
                {emoji}
              </span>
            ))}
          </div>
        )
      case "ring":
        return (
          <div key={effect.id} style={style} className="rounded-full animate-ping">
            <div
              className="rounded-full border-4"
              style={{
                width: size,
                height: size,
                borderColor: color,
              }}
            />
          </div>
        )
      default:
        return null
    }
  }

  return <div className="fixed inset-0 pointer-events-none z-40">{effects.map(renderEffect)}</div>
}
