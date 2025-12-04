"use client"

import type { Profile } from "@/lib/types"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { FileUpload } from "@/components/ui/file-upload"

interface AudioTabProps {
  profile: Profile
  updateProfile: (updates: Partial<Profile>) => void
}

export function AudioTab({ profile, updateProfile }: AudioTabProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Audio Settings</h3>

      <div className="space-y-2">
        <Label>Audio File (MP3)</Label>
        <FileUpload
          accept="audio"
          value={profile.audio_url || ""}
          onChange={(url) => updateProfile({ audio_url: url })}
        />
        <p className="text-xs text-muted-foreground">Leave empty to use video audio (if video background is set)</p>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="audio_autoplay">Autoplay</Label>
        <Switch
          id="audio_autoplay"
          checked={profile.audio_autoplay}
          onCheckedChange={(checked) => updateProfile({ audio_autoplay: checked })}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="audio_loop">Loop</Label>
        <Switch
          id="audio_loop"
          checked={profile.audio_loop}
          onCheckedChange={(checked) => updateProfile({ audio_loop: checked })}
        />
      </div>

      <div className="border-t border-border pt-4 space-y-3">
        <h4 className="font-medium">Player Controls</h4>

        <div className="flex items-center justify-between">
          <Label htmlFor="show_volume">Show Volume Slider</Label>
          <Switch
            id="show_volume"
            checked={profile.show_volume_slider}
            onCheckedChange={(checked) => updateProfile({ show_volume_slider: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="show_bass">Show Bass Boost</Label>
          <Switch
            id="show_bass"
            checked={profile.show_bass_boost}
            onCheckedChange={(checked) => updateProfile({ show_bass_boost: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="show_tempo">Show Tempo Slider</Label>
          <Switch
            id="show_tempo"
            checked={profile.show_tempo_slider}
            onCheckedChange={(checked) => updateProfile({ show_tempo_slider: checked })}
          />
        </div>
      </div>
    </div>
  )
}
