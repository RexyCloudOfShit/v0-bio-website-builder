"use client"

import { ProfilePage } from "@/components/profile/profile-page"
import type { Profile, SocialLink } from "@/lib/types"

interface Props {
  profile: Profile
  links: SocialLink[]
}

export function ProfilePreview({ profile, links }: Props) {
  return (
    <div className="h-screen overflow-hidden">
      <ProfilePage profile={profile} links={links} isPreview />
    </div>
  )
}
