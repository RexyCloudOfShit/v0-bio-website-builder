"use client"

import type React from "react"
import { useEffect, useRef, useCallback, useState } from "react"

interface SnowEffectProps {
  count: number
  speed: number
  wind: number
  size: number
  color: string
  opacity: number
  useImage?: boolean
  imageUrl?: string | null
  rotation?: boolean
  sway?: number
  containerRef?: React.RefObject<HTMLElement>
}

interface Snowflake {
  x: number
  y: number
  size: number
  speed: number
  wobble: number
  wobbleSpeed: number
  rotation: number
  rotationSpeed: number
  swayOffset: number
}

export function SnowEffect({
  count,
  speed,
  wind,
  size,
  color,
  opacity,
  useImage = false,
  imageUrl = null,
  rotation = true,
  sway = 1.0,
  containerRef,
}: SnowEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const snowflakesRef = useRef<Snowflake[]>([])
  const animationRef = useRef<number>(0)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const lastTimeRef = useRef<number>(0)

  const [isLowEnd, setIsLowEnd] = useState(false)

  useEffect(() => {
    // Detect low-end device by checking hardware concurrency and memory
    const lowEnd =
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
      // @ts-ignore - deviceMemory is not in all browsers
      (navigator.deviceMemory && navigator.deviceMemory <= 4)
    setIsLowEnd(!!lowEnd)
  }, [])

  const actualCount = isLowEnd ? Math.min(count, 50) : count

  useEffect(() => {
    if (useImage && imageUrl) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = imageUrl
      img.onload = () => {
        imageRef.current = img
      }
    } else {
      imageRef.current = null
    }
  }, [useImage, imageUrl])

  const createSnowflakes = useCallback(
    (width: number, height: number) => {
      const flakes: Snowflake[] = []
      for (let i = 0; i < actualCount; i++) {
        flakes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: (Math.random() * 3 + 1) * size,
          speed: (Math.random() * 1 + 0.5) * speed,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.02 + 0.005,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          swayOffset: Math.random() * Math.PI * 2,
        })
      }
      return flakes
    },
    [actualCount, speed, size],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const getSize = () => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect()
        return { width: rect.width, height: rect.height }
      }
      return { width: window.innerWidth, height: window.innerHeight }
    }

    const handleResize = () => {
      const { width, height } = getSize()
      const dpr = Math.min(window.devicePixelRatio || 1, isLowEnd ? 1 : 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
      snowflakesRef.current = createSnowflakes(width, height)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    let resizeObserver: ResizeObserver | null = null
    if (containerRef?.current) {
      resizeObserver = new ResizeObserver(handleResize)
      resizeObserver.observe(containerRef.current)
    }

    let frameCount = 0
    const frameSkip = isLowEnd ? 2 : 1

    const animate = (currentTime: number) => {
      frameCount++

      // Skip frames on low-end devices
      if (frameCount % frameSkip !== 0) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const deltaTime = lastTimeRef.current ? (currentTime - lastTimeRef.current) / 16.67 : 1
      lastTimeRef.current = currentTime

      const { width, height } = getSize()
      ctx.clearRect(0, 0, width, height)

      snowflakesRef.current.forEach((flake) => {
        flake.y += flake.speed * deltaTime
        flake.wobble += flake.wobbleSpeed * deltaTime
        if (rotation) {
          flake.rotation += flake.rotationSpeed * deltaTime
        }

        const swayAmount = Math.sin(flake.wobble + flake.swayOffset) * sway * 2
        flake.x += swayAmount * deltaTime + wind * deltaTime

        if (flake.y > height + 10) {
          flake.y = -10
          flake.x = Math.random() * width
        }
        if (flake.x > width + 10) flake.x = -10
        if (flake.x < -10) flake.x = width + 10

        ctx.save()
        ctx.globalAlpha = opacity
        ctx.translate(flake.x, flake.y)

        if (rotation) {
          ctx.rotate(flake.rotation)
        }

        if (useImage && imageRef.current) {
          const imgSize = flake.size * 10
          ctx.drawImage(imageRef.current, -imgSize / 2, -imgSize / 2, imgSize, imgSize)
        } else {
          ctx.fillStyle = color
          ctx.beginPath()
          ctx.arc(0, 0, flake.size, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      resizeObserver?.disconnect()
      cancelAnimationFrame(animationRef.current)
    }
  }, [
    actualCount,
    speed,
    wind,
    size,
    color,
    opacity,
    useImage,
    rotation,
    sway,
    createSnowflakes,
    containerRef,
    isLowEnd,
  ])

  return (
    <canvas
      ref={canvasRef}
      className={`${containerRef ? "absolute" : "fixed"} inset-0 pointer-events-none z-20`}
      style={{ imageRendering: "auto" }}
    />
  )
}
