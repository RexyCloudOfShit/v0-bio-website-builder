"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PLATFORMS } from "@/lib/types"
import type { Profile, SocialLink } from "@/lib/types"

interface Props {
  profile: Profile
  links: SocialLink[]
}

export function ProfileCard({ profile, links }: Props) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!profile.card_tilt_enabled || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const maxTilt = profile.card_tilt_intensity
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * maxTilt
    const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * maxTilt
    setRotation({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative max-w-sm w-full transition-transform duration-200"
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        padding: profile.card_padding,
        borderRadius: profile.card_border_radius,
        backgroundColor: profile.card_background,
        backdropFilter: profile.card_blur > 0 ? `blur(${profile.card_blur}px)` : undefined,
        boxShadow: profile.card_glow_enabled ? `0 0 40px ${profile.card_glow_color}40` : undefined,
        border: profile.card_border_enabled
          ? `${profile.card_border_width}px solid ${profile.card_border_color}`
          : undefined,
      }}
    >
      <div className="text-center">
        {profile.avatar_url && (
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarImage
              src={profile.avatar_url || "/placeholder.svg"}
              alt={profile.display_name || profile.username}
            />
            <AvatarFallback>{(profile.display_name || profile.username).charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        )}

        <h1 className="text-xl font-bold text-white mb-1">{profile.display_name || profile.username}</h1>

        {profile.bio && <p className="text-sm text-white/70 mb-4">{profile.bio}</p>}

        {/* Social Links */}
        {links.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {links.map((link) => {
              const platform = PLATFORMS.find((p) => p.id === link.platform)
              const iconUrl = link.icon_url || (platform?.id !== "custom" ? `/icons/${platform?.id}.svg` : null)
              const color = link.icon_color || platform?.color || "#ffffff"

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  title={link.title || platform?.name}
                >
                  {iconUrl && (
                    <img
                      src={iconUrl || "/placeholder.svg"}
                      alt=""
                      className="w-5 h-5"
                      style={{ filter: platform?.id !== "custom" ? `drop-shadow(0 0 0 ${color})` : undefined }}
                    />
                  )}
                  {link.title && <span className="text-sm text-white">{link.title}</span>}
                </a>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
