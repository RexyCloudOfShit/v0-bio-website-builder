"use client"

import { useEffect, useState } from "react"

interface Props {
  color?: string | null
  image?: string | null
}

export function CustomCursor({ color, image }: Props) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }

    const handleMouseLeave = () => setVisible(false)

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  if (!visible) return null

  const cursorColor = color || "#ffffff"

  return (
    <>
      <style jsx global>{`
        * { cursor: none !important; }
      `}</style>
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        {image ? (
          <img src={image || "/placeholder.svg"} alt="" className="w-8 h-8" />
        ) : (
          <div
            className="w-5 h-5 rounded-full border-2"
            style={{ borderColor: cursorColor, backgroundColor: cursorColor + "40" }}
          />
        )}
      </div>
    </>
  )
}
