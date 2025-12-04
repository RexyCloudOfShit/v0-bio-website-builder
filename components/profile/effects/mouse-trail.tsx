"use client"

import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"

interface MouseTrailProps {
  color: string
  length: number
  size?: number
  fade?: boolean
  rainbow?: boolean
  containerRef?: React.RefObject<HTMLElement>
}

interface TrailPoint {
  x: number
  y: number
  id: number
  timestamp: number
  hue?: number
}

export function MouseTrail({ color, length, size = 10, fade = true, rainbow = false, containerRef }: MouseTrailProps) {
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const counterRef = useRef(0)
  const hueRef = useRef(0)
  const frameRef = useRef<number>()
  const lastPosRef = useRef({ x: 0, y: 0 })
  const isMovingRef = useRef(false)
  const moveTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const fadeInterval = setInterval(() => {
      if (!isMovingRef.current) {
        setTrail((prev) => {
          if (prev.length === 0) return prev
          // Remove 3 points at a time for faster disappearing
          return prev.slice(3)
        })
      }
    }, 30) // Faster interval

    return () => clearInterval(fadeInterval)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      let x = e.clientX
      let y = e.clientY

      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect()
        if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
          return
        }
        x = e.clientX - rect.left
        y = e.clientY - rect.top
      }

      const dx = x - lastPosRef.current.x
      const dy = y - lastPosRef.current.y
      if (dx * dx + dy * dy < 4) return

      lastPosRef.current = { x, y }
      isMovingRef.current = true

      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current)
      }
      moveTimeoutRef.current = setTimeout(() => {
        isMovingRef.current = false
      }, 50)

      if (rainbow) {
        hueRef.current = (hueRef.current + 5) % 360
      }

      const newPoint: TrailPoint = {
        x,
        y,
        id: counterRef.current++,
        timestamp: Date.now(),
        hue: rainbow ? hueRef.current : undefined,
      }

      setTrail((prev) => {
        const newTrail = [...prev, newPoint]
        return newTrail.length > length ? newTrail.slice(-length) : newTrail
      })
    },
    [length, rainbow, containerRef],
  )

  useEffect(() => {
    const target = containerRef?.current || window

    const throttledHandler = (e: MouseEvent) => {
      if (frameRef.current) return
      frameRef.current = requestAnimationFrame(() => {
        handleMouseMove(e)
        frameRef.current = undefined
      })
    }

    target.addEventListener("mousemove", throttledHandler as EventListener)

    return () => {
      target.removeEventListener("mousemove", throttledHandler as EventListener)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current)
    }
  }, [handleMouseMove, containerRef])

  useEffect(() => {
    if (!containerRef?.current) return

    const handleLeave = () => setTrail([])
    containerRef.current.addEventListener("mouseleave", handleLeave)

    return () => {
      containerRef.current?.removeEventListener("mouseleave", handleLeave)
    }
  }, [containerRef])

  return (
    <div className={`${containerRef ? "absolute" : "fixed"} inset-0 pointer-events-none z-30`}>
      {trail.map((point, index) => {
        const scale = fade ? (index + 1) / trail.length : 1
        const opacity = fade ? scale * 0.8 : 0.8
        const pointColor = rainbow && point.hue !== undefined ? `hsl(${point.hue}, 100%, 50%)` : color

        return (
          <div
            key={point.id}
            className="absolute rounded-full will-change-transform"
            style={{
              left: point.x,
              top: point.y,
              width: size * scale,
              height: size * scale,
              backgroundColor: pointColor,
              opacity,
              transform: "translate(-50%, -50%)",
            }}
          />
        )
      })}
    </div>
  )
}
