"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import type { Profile } from "@/lib/types"

interface Props {
  profile: Profile
  containerRef: React.RefObject<HTMLDivElement | null>
}

interface Point {
  x: number
  y: number
  timestamp: number
}

export function MouseTrail({ profile, containerRef }: Props) {
  const [points, setPoints] = useState<Point[]>([])
  const lastMoveRef = useRef(Date.now())

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      lastMoveRef.current = Date.now()
      const newPoint = { x: e.clientX, y: e.clientY, timestamp: Date.now() }
      setPoints((prev) => [...prev.slice(-(profile.trail_length - 1)), newPoint])
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [profile.trail_length])

  // Fade out when not moving
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastMoveRef.current > 50) {
        setPoints((prev) => prev.slice(3))
      }
    }, 30)
    return () => clearInterval(interval)
  }, [])

  const getColor = (index: number) => {
    if (profile.trail_rainbow) {
      const hue = (index * 360) / profile.trail_length
      return `hsl(${hue}, 100%, 50%)`
    }
    return profile.trail_color || "#ffffff"
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {points.map((point, i) => (
        <div
          key={point.timestamp}
          className="absolute rounded-full"
          style={{
            left: point.x,
            top: point.y,
            width: profile.trail_size,
            height: profile.trail_size,
            backgroundColor: getColor(i),
            opacity: (i + 1) / points.length,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  )
}
