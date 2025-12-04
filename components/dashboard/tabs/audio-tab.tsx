"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { FileUpload } from "@/components/ui/file-upload"
import type { Profile } from "@/lib/types"

interface Props {
  profile: Profile
  onChange: (updates: Partial<Profile>) => void
}

export function AudioTab({ profile, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-white/70 text-sm mb-2 block">Audio File</Label>
        <FileUpload value={profile.audio_url} onChange={(url) => onChange({ audio_url: url })} type="audio" />
        <p className="text-xs text-white/40 mt-1">If empty, uses video audio</p>
      </div>

      <div>
        <Label className="text-white/70 text-sm">Volume: {Math.round(profile.audio_volume * 100)}%</Label>
        <Slider
          value={[profile.audio_volume]}
          onValueChange={([v]) => onChange({ audio_volume: v })}
          min={0}
          max={1}
          step={0.05}
          className="mt-2"
        />
      </div>

      <div>
        <Label className="text-white/70 text-sm">Tempo: {profile.audio_tempo}x</Label>
        <Slider
          value={[profile.audio_tempo]}
          onValueChange={([v]) => onChange({ audio_tempo: v })}
          min={0.5}
          max={2}
          step={0.05}
          className="mt-2"
        />
      </div>

      <div className="flex items-center justify-between">
        <Label className="text-white/70 text-sm">Bass Boost</Label>
        <Switch checked={profile.audio_bass_boost} onCheckedChange={(v) => onChange({ audio_bass_boost: v })} />
      </div>

      <div className="flex items-center justify-between">
        <Label className="text-white/70 text-sm">Preserve Pitch</Label>
        <Switch checked={profile.audio_preserve_pitch} onCheckedChange={(v) => onChange({ audio_preserve_pitch: v })} />
      </div>

      <div className="flex items-center justify-between">
        <Label className="text-white/70 text-sm">Show Controls</Label>
        <Switch checked={profile.show_audio_controls} onCheckedChange={(v) => onChange({ show_audio_controls: v })} />
      </div>
    </div>
  )
}
