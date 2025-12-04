"use client"

import { useState, useEffect } from "react"

export function AnimatedTitle() {
  const fullText = "niga.bio"
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const typeSpeed = 120
    const deleteSpeed = 80
    const pauseAtEnd = 2500
    const pauseAtStart = 800

    let timeout: NodeJS.Timeout

    if (isTyping) {
      if (displayText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1))
        }, typeSpeed)
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, pauseAtEnd)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, deleteSpeed)
      } else {
        timeout = setTimeout(() => {
          setIsTyping(true)
        }, pauseAtStart)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isTyping])

  return (
    <h1 className="text-6xl md:text-8xl font-bold mb-8 h-24 md:h-32 flex items-center justify-center">
      <span className="bg-gradient-to-r from-white via-purple-300 to-pink-400 bg-clip-text text-transparent">
        {displayText || "\u00A0"}
      </span>
      <span className="animate-pulse text-purple-400 ml-1">|</span>
    </h1>
  )
}
