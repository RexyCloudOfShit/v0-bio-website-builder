"use client"

import type React from "react"
import { useEffect, useState, useCallback, useRef } from "react"

interface CustomCursorProps {
  color?: string | null
  containerRef?: React.RefObject<HTMLElement>
}

export function CustomCursor({ color, containerRef }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const frameRef = useRef<number>()

  const safeColor = color || "#ffffff"

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (frameRef.current) return

      frameRef.current = requestAnimationFrame(() => {
        let x = e.clientX
        let y = e.clientY

        if (containerRef?.current) {
          const rect = containerRef.current.getBoundingClientRect()
          if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
            setIsVisible(false)
            frameRef.current = undefined
            return
          }
          x = e.clientX - rect.left
          y = e.clientY - rect.top
        }

        setPosition({ x, y })
        setIsVisible(true)
        frameRef.current = undefined
      })
    },
    [containerRef],
  )

  useEffect(() => {
    const target = containerRef?.current || window

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    target.addEventListener("mousemove", handleMouseMove as EventListener)

    if (containerRef?.current) {
      containerRef.current.addEventListener("mouseleave", handleMouseLeave)
      containerRef.current.addEventListener("mouseenter", handleMouseEnter)
    } else {
      document.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      target.removeEventListener("mousemove", handleMouseMove as EventListener)
      if (containerRef?.current) {
        containerRef.current.removeEventListener("mouseleave", handleMouseLeave)
        containerRef.current.removeEventListener("mouseenter", handleMouseEnter)
      } else {
        document.removeEventListener("mouseleave", handleMouseLeave)
      }
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [handleMouseMove, containerRef])

  if (!isVisible) return null

  return (
    <div
      className={`${containerRef ? "absolute" : "fixed"} pointer-events-none z-[9999]`}
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Outer ring */}
      <div
        className="absolute w-8 h-8 rounded-full border-2 transition-transform duration-100"
        style={{
          borderColor: safeColor,
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Inner dot */}
      <div
        className="absolute w-2 h-2 rounded-full"
        style={{
          backgroundColor: safeColor,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  )
}
