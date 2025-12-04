"use client"

import type { Profile } from "@/lib/types"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ColorPicker } from "@/components/ui/color-picker"
import { FileUpload } from "@/components/ui/file-upload"

interface MouseTabProps {
  profile: Profile
  updateProfile: (updates: Partial<Profile>) => void
}

const CLICK_EFFECTS = [
  { value: "ripple", label: "Ripple" },
  { value: "particles", label: "Particles" },
  { value: "ring", label: "Ring" },
  { value: "explosion", label: "Explosion" },
  { value: "pulse", label: "Pulse" },
  { value: "hearts", label: "Hearts" },
  { value: "stars", label: "Stars" },
  { value: "confetti", label: "Confetti" },
  { value: "smoke", label: "Smoke" },
  { value: "lightning", label: "Lightning" },
  { value: "fire", label: "Fire" },
  { value: "bubbles", label: "Bubbles" },
]

export function MouseTab({ profile, updateProfile }: MouseTabProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Mouse Effects</h3>

      <div className="space-y-3">
        <Label>Cursor Type</Label>
        <RadioGroup
          value={profile.cursor_type || "default"}
          onValueChange={(value) => updateProfile({ cursor_type: value as Profile["cursor_type"] })}
          className="grid grid-cols-3 gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="cursor-default" />
            <Label htmlFor="cursor-default" className="cursor-pointer">
              Default
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="custom" id="cursor-custom" />
            <Label htmlFor="cursor-custom" className="cursor-pointer">
              Custom
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hidden" id="cursor-hidden" />
            <Label htmlFor="cursor-hidden" className="cursor-pointer">
              Hidden
            </Label>
          </div>
        </RadioGroup>
      </div>

      {profile.cursor_type === "custom" && (
        <div className="space-y-4 p-3 rounded-lg bg-muted/50 border border-border">
          <div className="space-y-2">
            <Label>Cursor Image (optional)</Label>
            <FileUpload
              type="image"
              value={profile.cursor_image_url || ""}
              onChange={(url) => updateProfile({ cursor_image_url: url })}
            />
          </div>

          <ColorPicker
            label="Cursor Color (used if no image)"
            value={profile.cursor_color || "#ffffff"}
            onChange={(value) => updateProfile({ cursor_color: value })}
          />
        </div>
      )}

      <div className="border-t border-border pt-4 space-y-3">
        <h4 className="font-medium">Mouse Trail</h4>

        <div className="flex items-center justify-between">
          <Label htmlFor="trail_enabled">Enable Trail</Label>
          <Switch
            id="trail_enabled"
            checked={profile.mouse_trail_enabled || false}
            onCheckedChange={(checked) => updateProfile({ mouse_trail_enabled: checked })}
          />
        </div>

        {profile.mouse_trail_enabled && (
          <div className="space-y-4 p-3 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center justify-between">
              <Label htmlFor="trail_rainbow">Rainbow Mode</Label>
              <Switch
                id="trail_rainbow"
                checked={profile.mouse_trail_rainbow || false}
                onCheckedChange={(checked) => updateProfile({ mouse_trail_rainbow: checked })}
              />
            </div>

            {!profile.mouse_trail_rainbow && (
              <ColorPicker
                label="Trail Color"
                value={profile.mouse_trail_color || "#ffffff"}
                onChange={(value) => updateProfile({ mouse_trail_color: value })}
              />
            )}

            <div className="space-y-2">
              <Label>Trail Length: {profile.mouse_trail_length || 20}</Label>
              <Slider
                value={[profile.mouse_trail_length || 20]}
                onValueChange={([value]) => updateProfile({ mouse_trail_length: value })}
                min={5}
                max={50}
                step={5}
              />
            </div>

            <div className="space-y-2">
              <Label>Trail Size: {profile.mouse_trail_size || 10}px</Label>
              <Slider
                value={[profile.mouse_trail_size || 10]}
                onValueChange={([value]) => updateProfile({ mouse_trail_size: value })}
                min={4}
                max={30}
                step={2}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="trail_fade">Fade Effect</Label>
              <Switch
                id="trail_fade"
                checked={profile.mouse_trail_fade !== false}
                onCheckedChange={(checked) => updateProfile({ mouse_trail_fade: checked })}
              />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border pt-4 space-y-3">
        <h4 className="font-medium">Click Effects</h4>

        <div className="flex items-center justify-between">
          <Label htmlFor="click_enabled">Enable Click Effect</Label>
          <Switch
            id="click_enabled"
            checked={profile.click_effect_enabled || false}
            onCheckedChange={(checked) => updateProfile({ click_effect_enabled: checked })}
          />
        </div>

        {profile.click_effect_enabled && (
          <div className="space-y-4 p-3 rounded-lg bg-muted/50 border border-border">
            <div className="space-y-3">
              <Label>Effect Type</Label>
              <div className="grid grid-cols-3 gap-2">
                {CLICK_EFFECTS.map((effect) => (
                  <button
                    key={effect.value}
                    onClick={() => updateProfile({ click_effect_type: effect.value as Profile["click_effect_type"] })}
                    className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                      profile.click_effect_type === effect.value
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted border-border hover:bg-accent"
                    }`}
                  >
                    {effect.label}
                  </button>
                ))}
              </div>
            </div>

            <ColorPicker
              label="Effect Color"
              value={profile.click_effect_color || "#ffffff"}
              onChange={(value) => updateProfile({ click_effect_color: value })}
            />
          </div>
        )}
      </div>
    </div>
  )
}
