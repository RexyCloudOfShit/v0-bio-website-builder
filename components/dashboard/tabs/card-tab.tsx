"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ColorPicker } from "@/components/ui/color-picker"
import type { Profile } from "@/lib/types"

interface Props {
  profile: Profile
  onChange: (updates: Partial<Profile>) => void
}

export function CardTab({ profile, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-white/70 text-sm">Padding: {profile.card_padding}px</Label>
        <Slider
          value={[profile.card_padding]}
          onValueChange={([v]) => onChange({ card_padding: v })}
          min={0}
          max={48}
          step={4}
          className="mt-2"
        />
      </div>

      <div>
        <Label className="text-white/70 text-sm">Border Radius: {profile.card_border_radius}px</Label>
        <Slider
          value={[profile.card_border_radius]}
          onValueChange={([v]) => onChange({ card_border_radius: v })}
          min={0}
          max={32}
          step={2}
          className="mt-2"
        />
      </div>

      <div>
        <Label className="text-white/70 text-sm">Blur: {profile.card_blur}px</Label>
        <Slider
          value={[profile.card_blur]}
          onValueChange={([v]) => onChange({ card_blur: v })}
          min={0}
          max={30}
          step={1}
          className="mt-2"
        />
      </div>

      <div className="flex items-center justify-between">
        <Label className="text-white/70 text-sm">Glow Effect</Label>
        <Switch checked={profile.card_glow_enabled} onCheckedChange={(v) => onChange({ card_glow_enabled: v })} />
      </div>

      {profile.card_glow_enabled && (
        <div>
          <Label className="text-white/70 text-sm mb-2 block">Glow Color</Label>
          <ColorPicker value={profile.card_glow_color} onChange={(v) => onChange({ card_glow_color: v })} />
        </div>
      )}

      <div className="flex items-center justify-between">
        <Label className="text-white/70 text-sm">3D Tilt</Label>
        <Switch checked={profile.card_tilt_enabled} onCheckedChange={(v) => onChange({ card_tilt_enabled: v })} />
      </div>

      {profile.card_tilt_enabled && (
        <div>
          <Label className="text-white/70 text-sm">Tilt Intensity: {profile.card_tilt_intensity}°</Label>
          <Slider
            value={[profile.card_tilt_intensity]}
            onValueChange={([v]) => onChange({ card_tilt_intensity: v })}
            min={5}
            max={30}
            step={1}
            className="mt-2"
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <Label className="text-white/70 text-sm">Border</Label>
        <Switch checked={profile.card_border_enabled} onCheckedChange={(v) => onChange({ card_border_enabled: v })} />
      </div>

      {profile.card_border_enabled && (
        <>
          <div>
            <Label className="text-white/70 text-sm mb-2 block">Border Color</Label>
            <ColorPicker value={profile.card_border_color} onChange={(v) => onChange({ card_border_color: v })} />
          </div>
          <div>
            <Label className="text-white/70 text-sm">Border Width: {profile.card_border_width}px</Label>
            <Slider
              value={[profile.card_border_width]}
              onValueChange={([v]) => onChange({ card_border_width: v })}
              min={1}
              max={5}
              step={1}
              className="mt-2"
            />
          </div>
        </>
      )}

      <div className="flex items-center justify-between">
        <Label className="text-white/70 text-sm">Click to Enter</Label>
        <Switch checked={profile.click_to_enter} onCheckedChange={(v) => onChange({ click_to_enter: v })} />
      </div>
    </div>
  )
}
