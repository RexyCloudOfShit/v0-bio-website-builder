"use client"

import { useState, useEffect } from "react"

export function AnimatedTitle() {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const fullText = "niga.bio"

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (text.length < fullText.length) {
            setText(fullText.slice(0, text.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (text.length > 0) {
            setText(text.slice(0, -1))
          } else {
            setIsDeleting(false)
          }
        }
      },
      isDeleting ? 80 : 120,
    )

    return () => clearTimeout(timeout)
  }, [text, isDeleting])

  return (
    <h1 className="text-5xl sm:text-7xl font-bold mb-6 tracking-tight text-white">
      {text || "\u00A0"}
      <span className="animate-pulse">|</span>
    </h1>
  )
}
