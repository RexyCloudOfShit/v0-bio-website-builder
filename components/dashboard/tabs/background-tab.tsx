"use client"

import type { Profile } from "@/lib/types"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FileUpload } from "@/components/ui/file-upload"
import { ColorPicker } from "@/components/ui/color-picker"

interface BackgroundTabProps {
  profile: Profile
  updateProfile: (updates: Partial<Profile>) => void
}

export function BackgroundTab({ profile, updateProfile }: BackgroundTabProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Background</h3>

      <div className="space-y-3">
        <Label>Background Type</Label>
        <RadioGroup
          value={profile.background_type}
          onValueChange={(value) => updateProfile({ background_type: value as Profile["background_type"] })}
          className="grid grid-cols-3 gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="color" id="bg-color" />
            <Label htmlFor="bg-color" className="cursor-pointer">
              Color
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="image" id="bg-image" />
            <Label htmlFor="bg-image" className="cursor-pointer">
              Image
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="video" id="bg-video" />
            <Label htmlFor="bg-video" className="cursor-pointer">
              Video
            </Label>
          </div>
        </RadioGroup>
      </div>

      {profile.background_type === "color" && (
        <ColorPicker
          label="Background Color"
          value={profile.background_color}
          onChange={(value) => updateProfile({ background_color: value })}
        />
      )}

      {profile.background_type === "image" && (
        <div className="space-y-2">
          <Label>Background Image</Label>
          <FileUpload
            accept="image"
            value={profile.background_image_url || ""}
            onChange={(url) => updateProfile({ background_image_url: url })}
          />
        </div>
      )}

      {profile.background_type === "video" && (
        <div className="space-y-2">
          <Label>Background Video (MP4)</Label>
          <FileUpload
            accept="video"
            value={profile.background_video_url || ""}
            onChange={(url) => updateProfile({ background_video_url: url })}
          />
          <p className="text-xs text-muted-foreground">The video will loop automatically.</p>
        </div>
      )}
    </div>
  )
}
