"use client"

import { useState, useCallback } from "react"
import { type SocialLink, BRAND_COLORS, PLATFORMS } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ColorPicker } from "@/components/ui/color-picker"
import { FileUpload } from "@/components/ui/file-upload"
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from "lucide-react"

interface LinksTabProps {
  socialLinks: SocialLink[]
  addSocialLink: (link: Omit<SocialLink, "id" | "profile_id" | "created_at">) => void
  updateSocialLink: (id: string, updates: Partial<SocialLink>) => void
  deleteSocialLink: (id: string) => void
}

export function LinksTab({ socialLinks, addSocialLink, updateSocialLink, deleteSocialLink }: LinksTabProps) {
  const [expandedLink, setExpandedLink] = useState<string | null>(null)
  const [newLink, setNewLink] = useState({
    title: "",
    url: "",
    platform: "custom" as string,
    icon_url: "",
    icon_color: null as string | null,
    sort_order: socialLinks.length,
  })

  const handleAddLink = () => {
    if (newLink.url) {
      const brandColors = BRAND_COLORS[newLink.platform] || BRAND_COLORS.custom
      addSocialLink({
        platform: newLink.platform,
        url: newLink.url,
        title: newLink.title || null,
        icon_url: newLink.icon_url || null,
        icon_color: newLink.icon_color || brandColors.icon,
        sort_order: socialLinks.length,
      })
      setNewLink({
        title: "",
        url: "",
        platform: "custom",
        icon_url: "",
        icon_color: null,
        sort_order: socialLinks.length + 1,
      })
    }
  }

  const handleLinkFieldChange = useCallback(
    (id: string, field: keyof SocialLink, value: string | null) => {
      updateSocialLink(id, { [field]: value })
    },
    [updateSocialLink],
  )

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-foreground">Social Links</h3>
      <p className="text-xs text-muted-foreground">Leave title empty to show icon only</p>

      <div className="space-y-2">
        {socialLinks.map((link) => {
          const isExpanded = expandedLink === link.id
          const brandColors = BRAND_COLORS[link.platform] || BRAND_COLORS.custom

          return (
            <div key={link.id} className="border border-border rounded-lg overflow-hidden">
              <div
                className="flex items-center gap-2 p-3 bg-muted/30 cursor-pointer"
                onClick={() => setExpandedLink(isExpanded ? null : link.id)}
              >
                <GripVertical className="w-4 h-4 text-muted-foreground" />
                <div
                  className="w-8 h-8 rounded flex items-center justify-center"
                  style={{ backgroundColor: brandColors.bg }}
                >
                  <span style={{ color: link.icon_color || brandColors.icon }} className="text-xs font-bold">
                    {link.platform.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="flex-1 text-sm truncate text-foreground">{link.title || link.url}</span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>

              {isExpanded && (
                <div className="p-3 space-y-3 border-t border-border">
                  <div className="space-y-2">
                    <Label className="text-foreground">Title (optional)</Label>
                    <Input
                      key={`title-${link.id}`}
                      defaultValue={link.title || ""}
                      onBlur={(e) => handleLinkFieldChange(link.id, "title", e.target.value || null)}
                      placeholder="Leave empty for icon only"
                      className="bg-background text-foreground border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">URL</Label>
                    <Input
                      key={`url-${link.id}`}
                      defaultValue={link.url}
                      onBlur={(e) => handleLinkFieldChange(link.id, "url", e.target.value)}
                      placeholder="https://..."
                      className="bg-background text-foreground border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground">Platform</Label>
                    <Select
                      value={link.platform}
                      onValueChange={(value) => {
                        const newBrandColors = BRAND_COLORS[value] || BRAND_COLORS.custom
                        updateSocialLink(link.id, {
                          platform: value,
                          icon_color: newBrandColors.icon,
                        })
                      }}
                    >
                      <SelectTrigger className="bg-background text-foreground border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {PLATFORMS.map((platform) => (
                          <SelectItem key={platform} value={platform}>
                            {platform.charAt(0).toUpperCase() + platform.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {link.platform === "custom" && (
                    <div className="space-y-2">
                      <Label className="text-foreground">Custom Icon</Label>
                      <FileUpload
                        type="image"
                        value={link.icon_url || ""}
                        onChange={(url) => updateSocialLink(link.id, { icon_url: url })}
                      />
                    </div>
                  )}

                  <ColorPicker
                    label="Icon Color"
                    value={link.icon_color || brandColors.icon}
                    onChange={(value) => updateSocialLink(link.id, { icon_color: value })}
                  />

                  <Button variant="destructive" size="sm" onClick={() => deleteSocialLink(link.id)} className="w-full">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Link
                  </Button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="border-t border-border pt-4 space-y-3">
        <h4 className="font-medium text-foreground">Add New Link</h4>

        <div className="space-y-2">
          <Label htmlFor="new_url" className="text-foreground">
            URL
          </Label>
          <Input
            id="new_url"
            value={newLink.url}
            onChange={(e) => setNewLink((prev) => ({ ...prev, url: e.target.value }))}
            placeholder="https://discord.gg/..."
            className="bg-background text-foreground border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="new_title" className="text-foreground">
            Title (optional)
          </Label>
          <Input
            id="new_title"
            value={newLink.title}
            onChange={(e) => setNewLink((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Leave empty for icon only"
            className="bg-background text-foreground border-border"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-foreground">Platform</Label>
          <Select
            value={newLink.platform}
            onValueChange={(value) => setNewLink((prev) => ({ ...prev, platform: value }))}
          >
            <SelectTrigger className="bg-background text-foreground border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {PLATFORMS.map((platform) => (
                <SelectItem key={platform} value={platform}>
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {newLink.platform === "custom" && (
          <div className="space-y-2">
            <Label className="text-foreground">Custom Icon</Label>
            <FileUpload
              type="image"
              value={newLink.icon_url}
              onChange={(url) => setNewLink((prev) => ({ ...prev, icon_url: url }))}
            />
          </div>
        )}

        <Button onClick={handleAddLink} className="w-full gap-2" disabled={!newLink.url}>
          <Plus className="w-4 h-4" />
          Add Link
        </Button>
      </div>
    </div>
  )
}
