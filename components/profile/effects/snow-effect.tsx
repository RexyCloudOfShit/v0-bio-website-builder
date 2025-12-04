"use client"

import { useEffect, useRef } from "react"
import type { Profile } from "@/lib/types"

interface Props {
  profile: Profile
}

interface Particle {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

export function SnowEffect({ profile }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Create particles
    particlesRef.current = Array.from({ length: profile.snow_count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: (Math.random() * 3 + 1) * profile.snow_size,
      speed: (Math.random() * 1 + 0.5) * profile.snow_speed,
      opacity: Math.random() * 0.5 + 0.5,
    }))

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((p) => {
        p.y += p.speed
        p.x += profile.snow_wind

        if (p.y > canvas.height) {
          p.y = -10
          p.x = Math.random() * canvas.width
        }
        if (p.x > canvas.width) p.x = 0
        if (p.x < 0) p.x = canvas.width

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle =
          profile.snow_color +
          Math.round(p.opacity * profile.snow_opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [
    profile.snow_count,
    profile.snow_speed,
    profile.snow_wind,
    profile.snow_size,
    profile.snow_color,
    profile.snow_opacity,
  ])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />
}
