"use client"

import type { Profile } from "@/lib/types"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { ColorPicker } from "@/components/ui/color-picker"
import { FileUpload } from "@/components/ui/file-upload"

interface SnowTabProps {
  profile: Profile
  updateProfile: (updates: Partial<Profile>) => void
}

export function SnowTab({ profile, updateProfile }: SnowTabProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Particle Effects</h3>

      <div className="flex items-center justify-between">
        <Label htmlFor="snow_enabled">Enable Particles</Label>
        <Switch
          id="snow_enabled"
          checked={profile.snow_enabled}
          onCheckedChange={(checked) => updateProfile({ snow_enabled: checked })}
        />
      </div>

      {profile.snow_enabled && (
        <>
          <div className="flex items-center justify-between">
            <Label htmlFor="snow_use_image">Use Custom Image</Label>
            <Switch
              id="snow_use_image"
              checked={profile.snow_use_image}
              onCheckedChange={(checked) => updateProfile({ snow_use_image: checked })}
            />
          </div>

          {profile.snow_use_image ? (
            <div className="space-y-2">
              <Label>Particle Image</Label>
              <FileUpload
                accept="image"
                value={profile.snow_image_url || ""}
                onChange={(url) => updateProfile({ snow_image_url: url })}
              />
            </div>
          ) : (
            <ColorPicker
              label="Particle Color"
              value={profile.snow_color}
              onChange={(value) => updateProfile({ snow_color: value })}
            />
          )}

          <div className="space-y-2">
            <Label>Particle Count: {profile.snow_count}</Label>
            <Slider
              value={[profile.snow_count]}
              onValueChange={([value]) => updateProfile({ snow_count: value })}
              min={10}
              max={500}
              step={10}
            />
          </div>

          <div className="space-y-2">
            <Label>Fall Speed: {profile.snow_speed.toFixed(1)}x</Label>
            <Slider
              value={[profile.snow_speed]}
              onValueChange={([value]) => updateProfile({ snow_speed: value })}
              min={0.1}
              max={3}
              step={0.1}
            />
          </div>

          <div className="space-y-2">
            <Label>Wind: {profile.snow_wind.toFixed(1)}</Label>
            <Slider
              value={[profile.snow_wind]}
              onValueChange={([value]) => updateProfile({ snow_wind: value })}
              min={-2}
              max={2}
              step={0.1}
            />
          </div>

          <div className="space-y-2">
            <Label>Size: {profile.snow_size.toFixed(1)}x</Label>
            <Slider
              value={[profile.snow_size]}
              onValueChange={([value]) => updateProfile({ snow_size: value })}
              min={0.5}
              max={5}
              step={0.1}
            />
          </div>

          <div className="space-y-2">
            <Label>Sway Amount: {profile.snow_sway.toFixed(1)}x</Label>
            <Slider
              value={[profile.snow_sway]}
              onValueChange={([value]) => updateProfile({ snow_sway: value })}
              min={0}
              max={3}
              step={0.1}
            />
          </div>

          <div className="space-y-2">
            <Label>Opacity: {(profile.snow_opacity * 100).toFixed(0)}%</Label>
            <Slider
              value={[profile.snow_opacity]}
              onValueChange={([value]) => updateProfile({ snow_opacity: value })}
              min={0.1}
              max={1}
              step={0.05}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="snow_rotation">Enable Rotation</Label>
            <Switch
              id="snow_rotation"
              checked={profile.snow_rotation}
              onCheckedChange={(checked) => updateProfile({ snow_rotation: checked })}
            />
          </div>
        </>
      )}
    </div>
  )
}
