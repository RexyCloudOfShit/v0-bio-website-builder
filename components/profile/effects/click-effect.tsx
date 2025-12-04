"use client"

import type React from "react"

import { useEffect, useState, useCallback, useRef } from "react"

interface ClickEffectProps {
  type:
    | "ripple"
    | "particles"
    | "ring"
    | "explosion"
    | "pulse"
    | "hearts"
    | "stars"
    | "confetti"
    | "smoke"
    | "lightning"
    | "fire"
    | "bubbles"
  color: string
  containerRef?: React.RefObject<HTMLElement>
}

interface ClickPoint {
  x: number
  y: number
  id: number
}

export function ClickEffect({ type, color, containerRef }: ClickEffectProps) {
  const [clicks, setClicks] = useState<ClickPoint[]>([])
  const effectContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      let x = e.clientX
      let y = e.clientY

      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect()
        // Only trigger if click is inside container
        if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
          return
        }
        x = e.clientX - rect.left
        y = e.clientY - rect.top
      }

      const newClick: ClickPoint = {
        x,
        y,
        id: Date.now() + Math.random(),
      }

      setClicks((prev) => [...prev, newClick])

      const duration =
        type === "smoke" ? 1500 : type === "explosion" || type === "fire" ? 800 : type === "lightning" ? 400 : 600
      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== newClick.id))
      }, duration)
    }

    const target = containerRef?.current || window
    target.addEventListener("mousedown", handleMouseDown as EventListener)
    return () => target.removeEventListener("mousedown", handleMouseDown as EventListener)
  }, [type, containerRef])

  const renderEffect = useCallback(
    (click: ClickPoint) => {
      const baseStyle = {
        position: "absolute" as const,
        left: click.x,
        top: click.y,
        pointerEvents: "none" as const,
      }

      switch (type) {
        case "ripple":
          return (
            <div
              key={click.id}
              className="rounded-full"
              style={{
                ...baseStyle,
                width: 40,
                height: 40,
                backgroundColor: color,
                opacity: 0.5,
                transform: "translate(-50%, -50%)",
                animation: "ripple-expand 0.6s ease-out forwards",
              }}
            />
          )

        case "particles":
          return (
            <div key={click.id} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
              {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * Math.PI * 2
                const distance = 60 + Math.random() * 20
                const endX = Math.cos(angle) * distance
                const endY = Math.sin(angle) * distance

                return (
                  <div
                    key={i}
                    className="rounded-full absolute"
                    style={{
                      left: click.x,
                      top: click.y,
                      width: 4 + Math.random() * 4,
                      height: 4 + Math.random() * 4,
                      backgroundColor: color,
                      transform: "translate(-50%, -50%)",
                      animation: `particle-fly 0.6s ease-out forwards`,
                      pointerEvents: "none",
                      ["--end-x" as string]: `${endX}px`,
                      ["--end-y" as string]: `${endY}px`,
                    }}
                  />
                )
              })}
            </div>
          )

        case "ring":
          return (
            <div
              key={click.id}
              className="rounded-full border-2"
              style={{
                ...baseStyle,
                width: 20,
                height: 20,
                borderColor: color,
                transform: "translate(-50%, -50%)",
                animation: "ring-expand 0.5s ease-out forwards",
              }}
            />
          )

        case "explosion":
          return (
            <div key={click.id} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
              {[...Array(20)].map((_, i) => {
                const angle = (i / 20) * Math.PI * 2 + Math.random() * 0.5
                const distance = 60 + Math.random() * 60
                const endX = Math.cos(angle) * distance
                const endY = Math.sin(angle) * distance

                return (
                  <div
                    key={i}
                    className="rounded-full absolute"
                    style={{
                      left: click.x,
                      top: click.y,
                      width: 3 + Math.random() * 8,
                      height: 3 + Math.random() * 8,
                      backgroundColor: color,
                      transform: "translate(-50%, -50%)",
                      animation: `explosion-particle 0.8s ease-out forwards`,
                      pointerEvents: "none",
                      ["--end-x" as string]: `${endX}px`,
                      ["--end-y" as string]: `${endY}px`,
                    }}
                  />
                )
              })}
              <div
                className="rounded-full absolute"
                style={{
                  left: click.x,
                  top: click.y,
                  width: 30,
                  height: 30,
                  backgroundColor: color,
                  transform: "translate(-50%, -50%)",
                  animation: "explosion-center 0.4s ease-out forwards",
                  pointerEvents: "none",
                }}
              />
            </div>
          )

        case "pulse":
          return (
            <div key={click.id} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-full absolute"
                  style={{
                    left: click.x,
                    top: click.y,
                    width: 20,
                    height: 20,
                    border: `2px solid ${color}`,
                    transform: "translate(-50%, -50%)",
                    animation: `pulse-ring 0.6s ease-out forwards`,
                    animationDelay: `${i * 0.1}s`,
                    pointerEvents: "none",
                  }}
                />
              ))}
            </div>
          )

        case "hearts":
          return (
            <div key={click.id} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
              {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2
                const distance = 50 + Math.random() * 30

                return (
                  <div
                    key={i}
                    className="absolute text-lg"
                    style={{
                      left: click.x,
                      top: click.y,
                      color: color,
                      transform: "translate(-50%, -50%)",
                      animation: `float-out 0.8s ease-out forwards`,
                      pointerEvents: "none",
                      ["--end-x" as string]: `${Math.cos(angle) * distance}px`,
                      ["--end-y" as string]: `${Math.sin(angle) * distance - 30}px`,
                    }}
                  >
                    ♥
                  </div>
                )
              })}
            </div>
          )

        case "stars":
          return (
            <div key={click.id} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
              {[...Array(10)].map((_, i) => {
                const angle = (i / 10) * Math.PI * 2
                const distance = 60 + Math.random() * 30

                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      left: click.x,
                      top: click.y,
                      color: color,
                      fontSize: 12 + Math.random() * 8,
                      transform: "translate(-50%, -50%)",
                      animation: `star-burst 0.6s ease-out forwards`,
                      pointerEvents: "none",
                      ["--end-x" as string]: `${Math.cos(angle) * distance}px`,
                      ["--end-y" as string]: `${Math.sin(angle) * distance}px`,
                      ["--rotation" as string]: `${Math.random() * 360}deg`,
                    }}
                  >
                    ★
                  </div>
                )
              })}
            </div>
          )

        case "confetti":
          return (
            <div key={click.id} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
              {[...Array(25)].map((_, i) => {
                const colors = [color, "#ff6b6b", "#4ecdc4", "#ffe66d", "#95e1d3", "#a29bfe"]
                const randomColor = colors[Math.floor(Math.random() * colors.length)]

                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      left: click.x,
                      top: click.y,
                      width: 6 + Math.random() * 6,
                      height: 6 + Math.random() * 6,
                      backgroundColor: randomColor,
                      transform: "translate(-50%, -50%)",
                      animation: `confetti-fall 1s ease-out forwards`,
                      borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                      pointerEvents: "none",
                      ["--end-x" as string]: `${(Math.random() - 0.5) * 200}px`,
                      ["--end-y" as string]: `${80 + Math.random() * 80}px`,
                      ["--rotation" as string]: `${Math.random() * 720}deg`,
                    }}
                  />
                )
              })}
            </div>
          )

        case "smoke":
          return (
            <div key={click.id} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-full absolute"
                  style={{
                    left: click.x + (Math.random() - 0.5) * 30,
                    top: click.y,
                    width: 15 + i * 12,
                    height: 15 + i * 12,
                    backgroundColor: color,
                    transform: "translate(-50%, -50%)",
                    animation: `smoke-rise 1.5s ease-out forwards`,
                    animationDelay: `${i * 0.08}s`,
                    opacity: 0.4,
                    pointerEvents: "none",
                  }}
                />
              ))}
            </div>
          )

        case "lightning":
          return (
            <div key={click.id} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
              {[...Array(5)].map((_, i) => {
                const angle = (i / 5) * Math.PI * 2
                const length = 40 + Math.random() * 40

                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      left: click.x,
                      top: click.y,
                      width: 2,
                      height: length,
                      backgroundColor: color,
                      transform: `translate(-50%, -50%) rotate(${angle}rad)`,
                      transformOrigin: "center top",
                      animation: `lightning-flash 0.4s ease-out forwards`,
                      boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
                      pointerEvents: "none",
                    }}
                  />
                )
              })}
            </div>
          )

        case "fire":
          return (
            <div key={click.id} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
              {[...Array(15)].map((_, i) => {
                const fireColors = [color, "#ff6b35", "#ff9f1c", "#ffcd3c"]
                const randomFireColor = fireColors[Math.floor(Math.random() * fireColors.length)]

                return (
                  <div
                    key={i}
                    className="rounded-full absolute"
                    style={{
                      left: click.x + (Math.random() - 0.5) * 40,
                      top: click.y,
                      width: 8 + Math.random() * 12,
                      height: 8 + Math.random() * 12,
                      backgroundColor: randomFireColor,
                      transform: "translate(-50%, -50%)",
                      animation: `fire-rise 0.8s ease-out forwards`,
                      animationDelay: `${Math.random() * 0.2}s`,
                      pointerEvents: "none",
                    }}
                  />
                )
              })}
            </div>
          )

        case "bubbles":
          return (
            <div key={click.id} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-full absolute border-2"
                  style={{
                    left: click.x + (Math.random() - 0.5) * 60,
                    top: click.y,
                    width: 10 + Math.random() * 20,
                    height: 10 + Math.random() * 20,
                    borderColor: color,
                    backgroundColor: `${color}20`,
                    transform: "translate(-50%, -50%)",
                    animation: `bubble-float 1s ease-out forwards`,
                    animationDelay: `${Math.random() * 0.3}s`,
                    pointerEvents: "none",
                  }}
                />
              ))}
            </div>
          )

        default:
          return null
      }
    },
    [type, color],
  )

  const containerStyle = containerRef
    ? { position: "absolute" as const, inset: 0, pointerEvents: "none" as const, zIndex: 30, overflow: "hidden" }
    : { position: "fixed" as const, inset: 0, pointerEvents: "none" as const, zIndex: 30 }

  return (
    <>
      <style jsx global>{`
        @keyframes ripple-expand {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
        }
        @keyframes ring-expand {
          0% { width: 20px; height: 20px; opacity: 1; transform: translate(-50%, -50%); }
          100% { width: 100px; height: 100px; opacity: 0; transform: translate(-50%, -50%); }
        }
        @keyframes explosion-center {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
        @keyframes pulse-ring {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(5); opacity: 0; }
        }
        @keyframes smoke-rise {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
          100% { transform: translate(-50%, -200%) scale(3); opacity: 0; }
        }
        @keyframes particle-fly {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(0); opacity: 0; }
        }
        @keyframes explosion-particle {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(0); opacity: 0; }
        }
        @keyframes float-out {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(1.5); opacity: 0; }
        }
        @keyframes star-burst {
          0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
          100% { transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(0) rotate(var(--rotation)); opacity: 0; }
        }
        @keyframes confetti-fall {
          0% { transform: translate(-50%, -50%) rotate(0deg); opacity: 1; }
          100% { transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) rotate(var(--rotation)); opacity: 0; }
        }
        @keyframes lightning-flash {
          0% { opacity: 1; }
          20% { opacity: 0.2; }
          40% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes fire-rise {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -150%) scale(0); opacity: 0; }
        }
        @keyframes bubble-float {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          100% { transform: translate(-50%, -150%) scale(1.5); opacity: 0; }
        }
      `}</style>
      <div ref={effectContainerRef} style={containerStyle}>
        {clicks.map(renderEffect)}
      </div>
    </>
  )
}
