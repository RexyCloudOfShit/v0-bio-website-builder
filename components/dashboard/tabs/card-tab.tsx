"use client"

import type { Profile } from "@/lib/types"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { ColorPicker } from "@/components/ui/color-picker"

interface CardTabProps {
  profile: Profile
  updateProfile: (updates: Partial<Profile>) => void
}

export function CardTab({ profile, updateProfile }: CardTabProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Card Settings</h3>

      <div className="flex items-center justify-between">
        <Label htmlFor="click_enter">Click to Enter</Label>
        <Switch
          id="click_enter"
          checked={profile.click_to_enter || false}
          onCheckedChange={(checked) => updateProfile({ click_to_enter: checked })}
        />
      </div>
      <p className="text-xs text-muted-foreground">Blur page until visitor clicks to enter</p>

      <div className="border-t border-border pt-4 space-y-2">
        <Label>Padding: {profile.card_padding}px</Label>
        <Slider
          value={[profile.card_padding]}
          onValueChange={([value]) => updateProfile({ card_padding: value })}
          min={8}
          max={64}
          step={4}
        />
      </div>

      <div className="space-y-2">
        <Label>Border Radius: {profile.card_border_radius}px</Label>
        <Slider
          value={[profile.card_border_radius]}
          onValueChange={([value]) => updateProfile({ card_border_radius: value })}
          min={0}
          max={48}
          step={4}
        />
      </div>

      <div className="space-y-2">
        <Label>Blur: {profile.card_blur}px</Label>
        <Slider
          value={[profile.card_blur]}
          onValueChange={([value]) => updateProfile({ card_blur: value })}
          min={0}
          max={30}
          step={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="card_bg">Card Background</Label>
        <ColorPicker
          id="card_bg"
          label="Card Background"
          value={profile.card_background}
          onChange={(value) => updateProfile({ card_background: value })}
          showAlpha
        />
        <p className="text-xs text-muted-foreground">Use rgba for transparency</p>
      </div>

      <div className="border-t border-border pt-4 space-y-3">
        <h4 className="font-medium">Border</h4>

        <div className="flex items-center justify-between">
          <Label htmlFor="card_border">Enable Border</Label>
          <Switch
            id="card_border"
            checked={profile.card_border_enabled}
            onCheckedChange={(checked) => updateProfile({ card_border_enabled: checked })}
          />
        </div>

        {profile.card_border_enabled && (
          <>
            <ColorPicker
              label="Border Color"
              value={profile.card_border_color}
              onChange={(value) => updateProfile({ card_border_color: value })}
            />
            <div className="space-y-2">
              <Label>Border Width: {profile.card_border_width}px</Label>
              <Slider
                value={[profile.card_border_width]}
                onValueChange={([value]) => updateProfile({ card_border_width: value })}
                min={1}
                max={8}
                step={1}
              />
            </div>
          </>
        )}
      </div>

      <div className="border-t border-border pt-4 space-y-3">
        <h4 className="font-medium">Effects</h4>

        <div className="flex items-center justify-between">
          <Label htmlFor="card_tilt">3D Tilt on Hover</Label>
          <Switch
            id="card_tilt"
            checked={profile.card_tilt_enabled}
            onCheckedChange={(checked) => updateProfile({ card_tilt_enabled: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="card_glow">Glow Effect</Label>
          <Switch
            id="card_glow"
            checked={profile.card_glow_enabled}
            onCheckedChange={(checked) => updateProfile({ card_glow_enabled: checked })}
          />
        </div>

        {profile.card_glow_enabled && (
          <ColorPicker
            label="Glow Color"
            value={profile.card_glow_color}
            onChange={(value) => updateProfile({ card_glow_color: value })}
          />
        )}
      </div>

      <div className="border-t border-border pt-4 space-y-3">
        <h4 className="font-medium">Visit Counter</h4>

        <div className="flex items-center justify-between">
          <Label htmlFor="show_visits">Show Visit Counter</Label>
          <Switch
            id="show_visits"
            checked={profile.show_visit_counter}
            onCheckedChange={(checked) => updateProfile({ show_visit_counter: checked })}
          />
        </div>
      </div>

      <div className="border-t border-border pt-4 space-y-3">
        <h4 className="font-medium">Text Styling</h4>

        <ColorPicker
          label="Name Color"
          value={profile.name_color}
          onChange={(value) => updateProfile({ name_color: value })}
        />

        <div className="flex items-center justify-between">
          <Label htmlFor="name_glow">Name Glow Effect</Label>
          <Switch
            id="name_glow"
            checked={profile.name_glow_enabled}
            onCheckedChange={(checked) => updateProfile({ name_glow_enabled: checked })}
          />
        </div>

        {profile.name_glow_enabled && (
          <ColorPicker
            label="Name Glow Color"
            value={profile.name_glow_color}
            onChange={(value) => updateProfile({ name_glow_color: value })}
          />
        )}

        <ColorPicker
          label="Bio Color"
          value={profile.bio_color}
          onChange={(value) => updateProfile({ bio_color: value })}
        />
      </div>
    </div>
  )
}
