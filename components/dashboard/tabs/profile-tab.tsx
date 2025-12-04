"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileUpload } from "@/components/ui/file-upload"
import type { Profile } from "@/lib/types"

interface Props {
  profile: Profile
  onChange: (updates: Partial<Profile>) => void
}

export function ProfileTab({ profile, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-white/70 text-sm">Profile Picture</Label>
        <FileUpload value={profile.avatar_url} onChange={(url) => onChange({ avatar_url: url })} type="image" />
      </div>

      <div>
        <Label className="text-white/70 text-sm">Display Name</Label>
        <Input
          value={profile.display_name || ""}
          onChange={(e) => onChange({ display_name: e.target.value })}
          className="bg-white/5 border-white/10 text-white"
          placeholder="Your name"
        />
      </div>

      <div>
        <Label className="text-white/70 text-sm">Bio</Label>
        <Textarea
          value={profile.bio || ""}
          onChange={(e) => onChange({ bio: e.target.value })}
          className="bg-white/5 border-white/10 text-white resize-none"
          placeholder="Tell people about yourself"
          rows={3}
        />
      </div>

      <div>
        <Label className="text-white/70 text-sm">Page Title</Label>
        <Input
          value={profile.page_title || ""}
          onChange={(e) => onChange({ page_title: e.target.value })}
          className="bg-white/5 border-white/10 text-white"
          placeholder="Browser tab title"
        />
      </div>

      <div className="pt-2 text-sm text-white/40">
        Your profile: <span className="text-white/60">niga.bio/{profile.username}</span>
      </div>
    </div>
  )
}
