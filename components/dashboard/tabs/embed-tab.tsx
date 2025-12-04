"use client"

import type { Profile } from "@/lib/types"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { FileUpload } from "@/components/ui/file-upload"
import { Card, CardContent } from "@/components/ui/card"

interface EmbedTabProps {
  profile: Profile
  updateProfile: (updates: Partial<Profile>) => void
}

export function EmbedTab({ profile, updateProfile }: EmbedTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Discord Embed / OG Tags</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Customize how your page appears when shared on Discord and social media
        </p>
      </div>

      {/* Preview */}
      <Card className="bg-[#2f3136] border-l-4 border-l-primary">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground mb-2">Preview</p>
          <div className="space-y-1">
            <p className="text-sm text-primary font-medium">
              {profile.og_title || `${profile.display_name || profile.username} | niga.bio`}
            </p>
            <p className="text-xs text-[#dcddde]">
              {profile.og_description ||
                profile.bio ||
                `Check out ${profile.display_name || profile.username}'s bio page`}
            </p>
            {(profile.og_image_url || profile.avatar_url) && (
              <img
                src={profile.og_image_url || profile.avatar_url || ""}
                alt="OG Preview"
                className="w-full h-32 object-cover rounded mt-2"
              />
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-foreground">Embed Title</Label>
          <Input
            value={profile.og_title || ""}
            onChange={(e) => updateProfile({ og_title: e.target.value || null })}
            placeholder={`${profile.display_name || profile.username} | niga.bio`}
            className="bg-background text-foreground border-border"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-foreground">Embed Description</Label>
          <Textarea
            value={profile.og_description || ""}
            onChange={(e) => updateProfile({ og_description: e.target.value || null })}
            placeholder={profile.bio || "Check out my bio page"}
            className="bg-background text-foreground border-border resize-none"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-foreground">Embed Image</Label>
          <FileUpload
            value={profile.og_image_url || ""}
            onChange={(url) => updateProfile({ og_image_url: url || null })}
            accept="image"
          />
        </div>
      </div>

      <div className="border-t border-border pt-4 space-y-4">
        <h4 className="font-medium text-foreground">Site Title Animation</h4>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-foreground">Animated Title</Label>
            <p className="text-xs text-muted-foreground">Homepage typing animation</p>
          </div>
          <Switch
            checked={profile.site_title_animated}
            onCheckedChange={(checked) => updateProfile({ site_title_animated: checked })}
          />
        </div>
      </div>
    </div>
  )
}
