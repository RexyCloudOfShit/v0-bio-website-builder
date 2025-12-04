"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ColorPicker } from "@/components/ui/color-picker"
import { FileUpload } from "@/components/ui/file-upload"
import type { Profile } from "@/lib/types"

interface Props {
  profile: Profile
  onChange: (updates: Partial<Profile>) => void
}

export function SnowTab({ profile, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-white/70 text-sm">Enable Particles</Label>
        <Switch checked={profile.snow_enabled} onCheckedChange={(v) => onChange({ snow_enabled: v })} />
      </div>

      {profile.snow_enabled && (
        <>
          <div>
            <Label className="text-white/70 text-sm">Count: {profile.snow_count}</Label>
            <Slider
              value={[profile.snow_count]}
              onValueChange={([v]) => onChange({ snow_count: v })}
              min={10}
              max={200}
              step={5}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-white/70 text-sm">Speed: {profile.snow_speed}x</Label>
            <Slider
              value={[profile.snow_speed]}
              onValueChange={([v]) => onChange({ snow_speed: v })}
              min={0.1}
              max={3}
              step={0.1}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-white/70 text-sm">Wind: {profile.snow_wind}</Label>
            <Slider
              value={[profile.snow_wind]}
              onValueChange={([v]) => onChange({ snow_wind: v })}
              min={-2}
              max={2}
              step={0.1}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-white/70 text-sm">Size: {profile.snow_size}x</Label>
            <Slider
              value={[profile.snow_size]}
              onValueChange={([v]) => onChange({ snow_size: v })}
              min={0.5}
              max={3}
              step={0.1}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-white/70 text-sm">Opacity: {Math.round(profile.snow_opacity * 100)}%</Label>
            <Slider
              value={[profile.snow_opacity]}
              onValueChange={([v]) => onChange({ snow_opacity: v })}
              min={0.1}
              max={1}
              step={0.05}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-white/70 text-sm mb-2 block">Color</Label>
            <ColorPicker value={profile.snow_color} onChange={(v) => onChange({ snow_color: v })} />
          </div>

          <div>
            <Label className="text-white/70 text-sm mb-2 block">Custom Image</Label>
            <FileUpload value={profile.snow_image} onChange={(url) => onChange({ snow_image: url })} type="image" />
          </div>
        </>
      )}
    </div>
  )
}
