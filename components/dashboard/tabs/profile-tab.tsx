"use client"

import type { Profile } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileUpload } from "@/components/ui/file-upload"

interface ProfileTabProps {
  profile: Profile
  updateProfile: (updates: Partial<Profile>) => void
}

export function ProfileTab({ profile, updateProfile }: ProfileTabProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Profile</h3>

      <div className="space-y-2">
        <Label htmlFor="display_name">Display Name</Label>
        <Input
          id="display_name"
          value={profile.display_name || ""}
          onChange={(e) => updateProfile({ display_name: e.target.value })}
          placeholder="Your display name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={profile.bio || ""}
          onChange={(e) => updateProfile({ bio: e.target.value })}
          placeholder="Tell people about yourself..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>Avatar</Label>
        <FileUpload
          accept="image"
          value={profile.avatar_url || ""}
          onChange={(url) => updateProfile({ avatar_url: url })}
        />
      </div>

      <div className="pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          <p>
            Your URL: <span className="text-primary">niga.bio/{profile.username}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
