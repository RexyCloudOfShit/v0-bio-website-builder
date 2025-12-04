"use client"

import type { Profile, SocialLink } from "@/lib/types"
import { ProfilePage } from "@/components/profile/profile-page"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface PreviewProps {
  profile: Profile
  socialLinks: SocialLink[]
  updateProfile: (updates: Partial<Profile>) => void
}

export function Preview({ profile, socialLinks, updateProfile }: PreviewProps) {
  const recenterCard = () => {
    updateProfile({
      card_position_x: 50,
      card_position_y: 50,
    })
  }

  return (
    <div className="h-full relative">
      {/* Recenter button */}
      <div className="absolute top-4 right-4 z-50">
        <Button variant="secondary" size="sm" onClick={recenterCard} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Recenter
        </Button>
      </div>

      {/* Profile preview */}
      <ProfilePage
        profile={profile}
        socialLinks={socialLinks}
        isPreview={true}
        onPositionChange={(x, y) => updateProfile({ card_position_x: x, card_position_y: y })}
      />
    </div>
  )
}
