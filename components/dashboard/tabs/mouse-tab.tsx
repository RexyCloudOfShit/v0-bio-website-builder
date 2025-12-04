"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ColorPicker } from "@/components/ui/color-picker"
import { FileUpload } from "@/components/ui/file-upload"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CLICK_EFFECTS } from "@/lib/types"
import type { Profile } from "@/lib/types"

interface Props {
  profile: Profile
  onChange: (updates: Partial<Profile>) => void
}

export function MouseTab({ profile, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-white/70 text-sm mb-2 block">Cursor Type</Label>
        <RadioGroup
          value={profile.cursor_type}
          onValueChange={(v) => onChange({ cursor_type: v as Profile["cursor_type"] })}
          className="flex gap-4"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="default" id="cursor-default" />
            <Label htmlFor="cursor-default" className="text-white/70">
              Default
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="custom" id="cursor-custom" />
            <Label htmlFor="cursor-custom" className="text-white/70">
              Custom
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="hidden" id="cursor-hidden" />
            <Label htmlFor="cursor-hidden" className="text-white/70">
              Hidden
            </Label>
          </div>
        </RadioGroup>
      </div>

      {profile.cursor_type === "custom" && (
        <>
          <div>
            <Label className="text-white/70 text-sm mb-2 block">Cursor Color</Label>
            <ColorPicker value={profile.cursor_color || "#ffffff"} onChange={(v) => onChange({ cursor_color: v })} />
          </div>
          <div>
            <Label className="text-white/70 text-sm mb-2 block">Or Custom Image</Label>
            <FileUpload value={profile.cursor_image} onChange={(url) => onChange({ cursor_image: url })} type="image" />
          </div>
        </>
      )}

      <div className="flex items-center justify-between">
        <Label className="text-white/70 text-sm">Mouse Trail</Label>
        <Switch checked={profile.trail_enabled} onCheckedChange={(v) => onChange({ trail_enabled: v })} />
      </div>

      {profile.trail_enabled && (
        <>
          <div className="flex items-center justify-between">
            <Label className="text-white/70 text-sm">Rainbow Mode</Label>
            <Switch checked={profile.trail_rainbow} onCheckedChange={(v) => onChange({ trail_rainbow: v })} />
          </div>

          {!profile.trail_rainbow && (
            <div>
              <Label className="text-white/70 text-sm mb-2 block">Trail Color</Label>
              <ColorPicker value={profile.trail_color || "#ffffff"} onChange={(v) => onChange({ trail_color: v })} />
            </div>
          )}

          <div>
            <Label className="text-white/70 text-sm">Trail Length: {profile.trail_length}</Label>
            <Slider
              value={[profile.trail_length]}
              onValueChange={([v]) => onChange({ trail_length: v })}
              min={5}
              max={50}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-white/70 text-sm">Trail Size: {profile.trail_size}px</Label>
            <Slider
              value={[profile.trail_size]}
              onValueChange={([v]) => onChange({ trail_size: v })}
              min={2}
              max={12}
              step={1}
              className="mt-2"
            />
          </div>
        </>
      )}

      <div>
        <Label className="text-white/70 text-sm mb-2 block">Click Effect</Label>
        <Select value={profile.click_effect_type} onValueChange={(v) => onChange({ click_effect_type: v })}>
          <SelectTrigger className="bg-white/5 border-white/10 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CLICK_EFFECTS.map((e) => (
              <SelectItem key={e.id} value={e.id}>
                {e.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {profile.click_effect_type !== "none" && (
        <>
          <div>
            <Label className="text-white/70 text-sm mb-2 block">Effect Color</Label>
            <ColorPicker
              value={profile.click_effect_color || "#ffffff"}
              onChange={(v) => onChange({ click_effect_color: v })}
            />
          </div>
          <div>
            <Label className="text-white/70 text-sm">Effect Size: {profile.click_effect_size}px</Label>
            <Slider
              value={[profile.click_effect_size]}
              onValueChange={([v]) => onChange({ click_effect_size: v })}
              min={20}
              max={60}
              step={2}
              className="mt-2"
            />
          </div>
        </>
      )}
    </div>
  )
}
