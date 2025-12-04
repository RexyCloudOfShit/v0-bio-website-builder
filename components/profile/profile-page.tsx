"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback, useMemo } from "react"
import type { Profile, SocialLink } from "@/lib/types"
import { ProfileCard } from "./profile-card"
import { SnowEffect } from "./effects/snow-effect"
import { MouseTrail } from "./effects/mouse-trail"
import { ClickEffect } from "./effects/click-effect"
import { AudioPlayer } from "./audio-player"
import { CustomCursor } from "./effects/custom-cursor"
import { MousePointer } from "lucide-react"

interface ProfilePageProps {
  profile: Profile
  socialLinks: SocialLink[]
  isPreview?: boolean
  onPositionChange?: (x: number, y: number) => void
}

export function ProfilePage({ profile, socialLinks, isPreview = false, onPositionChange }: ProfilePageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [cardPosition, setCardPosition] = useState({ x: profile.card_position_x, y: profile.card_position_y })
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasEntered, setHasEntered] = useState(isPreview || !profile.click_to_enter)

  useEffect(() => {
    setCardPosition({ x: profile.card_position_x, y: profile.card_position_y })
  }, [profile.card_position_x, profile.card_position_y])

  useEffect(() => {
    setHasEntered(isPreview || !profile.click_to_enter)
  }, [profile.click_to_enter, isPreview])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!isPreview) return
      const rect = (e.target as HTMLElement).closest("[data-card]")?.getBoundingClientRect()
      if (!rect) return

      setIsDragging(true)
      setDragOffset({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      })
    },
    [isPreview],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100
      const y = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100

      const clampedX = Math.max(10, Math.min(90, x))
      const clampedY = Math.max(10, Math.min(90, y))

      setCardPosition({ x: clampedX, y: clampedY })
    },
    [isDragging, dragOffset],
  )

  const handleMouseUp = useCallback(() => {
    if (isDragging && onPositionChange) {
      onPositionChange(cardPosition.x, cardPosition.y)
    }
    setIsDragging(false)
  }, [isDragging, cardPosition, onPositionChange])

  const audioSource = profile.audio_url || null
  const shouldPlayVideoAudio = !profile.audio_url && profile.background_type === "video"
  const hasAudio = audioSource || shouldPlayVideoAudio

  const cursorStyle = useMemo(() => {
    if (profile.cursor_type === "hidden") return "none"
    if (profile.cursor_type === "custom") {
      if (profile.cursor_image_url) {
        return `url(${profile.cursor_image_url}) 16 16, auto`
      }
      return "none"
    }
    return "auto"
  }, [profile.cursor_type, profile.cursor_image_url])

  const showCustomCursor = profile.cursor_type === "custom" && !profile.cursor_image_url

  if (!hasEntered) {
    return (
      <div
        className="relative w-full h-full min-h-screen overflow-hidden cursor-pointer"
        onClick={() => setHasEntered(true)}
      >
        {profile.background_type === "color" && (
          <div className="absolute inset-0 blur-xl" style={{ backgroundColor: profile.background_color }} />
        )}
        {profile.background_type === "image" && profile.background_image_url && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-xl scale-110"
            style={{ backgroundImage: `url(${profile.background_image_url})` }}
          />
        )}
        {profile.background_type === "video" && profile.background_video_url && (
          <video
            className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
            src={profile.background_video_url}
            autoPlay
            loop
            muted
            playsInline
          />
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="text-center animate-pulse">
            <MousePointer className="w-12 h-12 mx-auto mb-4 text-white" />
            <p className="text-xl text-white font-medium">Click to Enter</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: cursorStyle }}
    >
      {profile.cursor_type === "hidden" && (
        <style>{`
          * { cursor: none !important; }
        `}</style>
      )}

      {profile.background_type === "color" && (
        <div className="absolute inset-0" style={{ backgroundColor: profile.background_color }} />
      )}

      {profile.background_type === "image" && profile.background_image_url && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${profile.background_image_url})` }}
        />
      )}

      {profile.background_type === "video" && profile.background_video_url && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={profile.background_video_url}
          autoPlay
          loop
          muted={!shouldPlayVideoAudio}
          playsInline
          crossOrigin="anonymous"
        />
      )}

      {profile.snow_enabled && (
        <SnowEffect
          count={profile.snow_count}
          speed={profile.snow_speed}
          wind={profile.snow_wind}
          size={profile.snow_size}
          color={profile.snow_color}
          opacity={profile.snow_opacity}
          useImage={profile.snow_use_image}
          imageUrl={profile.snow_image_url}
          rotation={profile.snow_rotation}
          sway={profile.snow_sway}
          containerRef={isPreview ? containerRef : undefined}
        />
      )}

      {profile.mouse_trail_enabled && profile.cursor_type !== "hidden" && (
        <MouseTrail
          color={profile.mouse_trail_color}
          length={profile.mouse_trail_length}
          size={profile.mouse_trail_size || 10}
          fade={profile.mouse_trail_fade !== false}
          rainbow={profile.mouse_trail_rainbow || false}
          containerRef={isPreview ? containerRef : undefined}
        />
      )}

      {profile.click_effect_enabled && (
        <ClickEffect
          type={profile.click_effect_type}
          color={profile.click_effect_color}
          containerRef={isPreview ? containerRef : undefined}
        />
      )}

      {showCustomCursor && (
        <CustomCursor color={profile.cursor_color} containerRef={isPreview ? containerRef : undefined} />
      )}

      {profile.show_visit_counter && (
        <div className="absolute bottom-4 left-4 z-20">
          <div className="text-xs text-white/60 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
            {(profile.visit_count || 0).toLocaleString()} views
          </div>
        </div>
      )}

      <div
        data-card
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          left: `${cardPosition.x}%`,
          top: `${cardPosition.y}%`,
          cursor: isPreview ? (isDragging ? "grabbing" : "grab") : cursorStyle,
        }}
        onMouseDown={handleMouseDown}
      >
        <ProfileCard profile={profile} socialLinks={socialLinks} isPreview={isPreview} />
      </div>

      {hasAudio && (
        <div
          className="absolute z-20"
          style={{
            left: `${cardPosition.x}%`,
            top: `calc(${cardPosition.y}% + 180px)`,
            transform: "translateX(-50%)",
          }}
        >
          <AudioPlayer
            src={audioSource || ""}
            videoRef={shouldPlayVideoAudio ? videoRef : undefined}
            autoplay={profile.audio_autoplay}
            loop={profile.audio_loop}
            showVolume={profile.show_volume_slider}
            showBassBoost={profile.show_bass_boost}
            showTempo={profile.show_tempo_slider}
            isPreview={isPreview}
          />
        </div>
      )}
    </div>
  )
}
