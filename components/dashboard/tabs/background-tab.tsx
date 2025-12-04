"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ColorPicker } from "@/components/ui/color-picker"
import { FileUpload } from "@/components/ui/file-upload"
import type { Profile } from "@/lib/types"

interface Props {
  profile: Profile
  onChange: (updates: Partial<Profile>) => void
}

export function BackgroundTab({ profile, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-white/70 text-sm mb-2 block">Type</Label>
        <RadioGroup
          value={profile.background_type}
          onValueChange={(v) => onChange({ background_type: v as Profile["background_type"] })}
          className="flex gap-4"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="color" id="bg-color" />
            <Label htmlFor="bg-color" className="text-white/70">
              Color
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="image" id="bg-image" />
            <Label htmlFor="bg-image" className="text-white/70">
              Image
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="video" id="bg-video" />
            <Label htmlFor="bg-video" className="text-white/70">
              Video
            </Label>
          </div>
        </RadioGroup>
      </div>

      {profile.background_type === "color" && (
        <div>
          <Label className="text-white/70 text-sm mb-2 block">Color</Label>
          <ColorPicker value={profile.background_color} onChange={(v) => onChange({ background_color: v })} />
        </div>
      )}

      {profile.background_type === "image" && (
        <div>
          <Label className="text-white/70 text-sm mb-2 block">Image</Label>
          <FileUpload
            value={profile.background_image}
            onChange={(url) => onChange({ background_image: url })}
            type="image"
          />
        </div>
      )}

      {profile.background_type === "video" && (
        <div>
          <Label className="text-white/70 text-sm mb-2 block">Video</Label>
          <FileUpload
            value={profile.background_video}
            onChange={(url) => onChange({ background_video: url })}
            type="video"
          />
        </div>
      )}
    </div>
  )
}
