"use client"

import { useState, useRef } from "react"
import { ProfileCard } from "./profile-card"
import { AudioPlayer } from "./audio-player"
import { SnowEffect } from "./effects/snow-effect"
import { MouseTrail } from "./effects/mouse-trail"
import { CustomCursor } from "./effects/custom-cursor"
import { ClickEffect } from "./effects/click-effect"
import type { Profile, SocialLink } from "@/lib/types"

interface Props {
  profile: Profile
  links: SocialLink[]
  isPreview?: boolean
}

export function ProfilePage({ profile, links, isPreview }: Props) {
  const [entered, setEntered] = useState(!profile.click_to_enter)
  const containerRef = useRef<HTMLDivElement>(null)

  const audioSrc = profile.audio_url || (profile.background_type === "video" ? profile.background_video : null)

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{
        backgroundColor: profile.background_type === "color" ? profile.background_color : "#0a0a0a",
        cursor: profile.cursor_type === "hidden" ? "none" : undefined,
      }}
    >
      {/* Background */}
      {profile.background_type === "image" && profile.background_image && (
        <img
          src={profile.background_image || "/placeholder.svg"}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {profile.background_type === "video" && profile.background_video && entered && (
        <video
          src={profile.background_video}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Click to Enter Overlay */}
      {!entered && profile.click_to_enter && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={() => setEntered(true)}
        >
          <div className="text-center">
            <p className="text-2xl text-white font-bold mb-2">Click to Enter</p>
            <p className="text-white/50">Click anywhere to continue</p>
          </div>
        </div>
      )}

      {/* Effects */}
      {entered && profile.snow_enabled && <SnowEffect profile={profile} />}
      {entered && profile.trail_enabled && <MouseTrail profile={profile} containerRef={containerRef} />}
      {entered && profile.cursor_type === "custom" && (
        <CustomCursor color={profile.cursor_color || "#ffffff"} image={profile.cursor_image} />
      )}
      {entered && profile.click_effect_type !== "none" && <ClickEffect profile={profile} containerRef={containerRef} />}

      {/* Card */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <ProfileCard profile={profile} links={links} />
      </div>

      {/* Audio */}
      {entered && audioSrc && profile.show_audio_controls && <AudioPlayer profile={profile} src={audioSrc} />}
    </div>
  )
}
