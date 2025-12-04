"use client"

import { useState, useCallback } from "react"
import { type SocialLink, BRAND_COLORS } from "@/lib/types"
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

const ICON_OPTIONS = [
  { value: "discord", label: "Discord" },
  { value: "steam", label: "Steam" },
  { value: "xbox", label: "Xbox" },
  { value: "twitter", label: "Twitter/X" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "github", label: "GitHub" },
  { value: "twitch", label: "Twitch" },
  { value: "spotify", label: "Spotify" },
  { value: "snapchat", label: "Snapchat" },
  { value: "reddit", label: "Reddit" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "paypal", label: "PayPal" },
  { value: "cashapp", label: "Cash App" },
  { value: "custom", label: "Custom Image" },
]

export function LinksTab({ socialLinks, addSocialLink, updateSocialLink, deleteSocialLink }: LinksTabProps) {
  const [expandedLink, setExpandedLink] = useState<string | null>(null)
  const [newLink, setNewLink] = useState({
    title: "",
    url: "",
    icon_type: "custom" as SocialLink["icon_type"],
    custom_icon_url: "",
    icon_color: null as string | null,
    background_color: null as string | null,
    display_order: socialLinks.length,
  })

  const handleAddLink = () => {
    if (newLink.url) {
      const brandColors = BRAND_COLORS[newLink.icon_type] || BRAND_COLORS.custom
      addSocialLink({
        ...newLink,
        icon_color: newLink.icon_color || brandColors.icon,
        background_color: newLink.background_color || brandColors.bg,
      })
      setNewLink({
        title: "",
        url: "",
        icon_type: "custom",
        custom_icon_url: "",
        icon_color: null,
        background_color: null,
        display_order: socialLinks.length + 1,
      })
    }
  }

  const handleIconTypeChange = (value: SocialLink["icon_type"], isNew = false) => {
    const brandColors = BRAND_COLORS[value] || BRAND_COLORS.custom
    if (isNew) {
      setNewLink((prev) => ({
        ...prev,
        icon_type: value,
        icon_color: brandColors.icon,
        background_color: brandColors.bg,
      }))
    }
  }

  const handleLinkFieldChange = useCallback(
    (id: string, field: keyof SocialLink, value: string) => {
      updateSocialLink(id, { [field]: value })
    },
    [updateSocialLink],
  )

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-foreground">Social Links</h3>
      <p className="text-xs text-muted-foreground">Leave title empty to show icon only</p>

      {/* Existing links */}
      <div className="space-y-2">
        {socialLinks.map((link) => {
          const isExpanded = expandedLink === link.id
          const brandColors = BRAND_COLORS[link.icon_type] || BRAND_COLORS.custom

          return (
            <div key={link.id} className="border border-border rounded-lg overflow-hidden">
              <div
                className="flex items-center gap-2 p-3 bg-muted/30 cursor-pointer"
                onClick={() => setExpandedLink(isExpanded ? null : link.id)}
              >
                <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                <div
                  className="w-8 h-8 rounded flex items-center justify-center"
                  style={{ backgroundColor: link.background_color || brandColors.bg }}
                >
                  <span style={{ color: link.icon_color || brandColors.icon }} className="text-xs font-bold">
                    {link.icon_type.charAt(0).toUpperCase()}
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
                      defaultValue={link.title}
                      onBlur={(e) => handleLinkFieldChange(link.id, "title", e.target.value)}
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
                    <Label className="text-foreground">Icon Type</Label>
                    <Select
                      value={link.icon_type}
                      onValueChange={(value) => {
                        const newBrandColors = BRAND_COLORS[value] || BRAND_COLORS.custom
                        updateSocialLink(link.id, {
                          icon_type: value as SocialLink["icon_type"],
                          icon_color: newBrandColors.icon,
                          background_color: newBrandColors.bg,
                        })
                      }}
                    >
                      <SelectTrigger className="bg-background text-foreground border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {ICON_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {link.icon_type === "custom" && (
                    <div className="space-y-2">
                      <Label className="text-foreground">Custom Icon</Label>
                      <FileUpload
                        accept="image"
                        value={link.custom_icon_url || ""}
                        onChange={(url) => updateSocialLink(link.id, { custom_icon_url: url })}
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <ColorPicker
                      label="Icon Color"
                      value={link.icon_color || brandColors.icon}
                      onChange={(value) => updateSocialLink(link.id, { icon_color: value })}
                    />
                    <ColorPicker
                      label="Background"
                      value={link.background_color || brandColors.bg}
                      onChange={(value) => updateSocialLink(link.id, { background_color: value })}
                    />
                  </div>

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

      {/* Add new link */}
      <div className="border-t border-border pt-4 space-y-3">
        <h4 className="font-medium text-foreground">Add New Link</h4>

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
          <Label className="text-foreground">Icon</Label>
          <Select
            value={newLink.icon_type}
            onValueChange={(value) => handleIconTypeChange(value as SocialLink["icon_type"], true)}
          >
            <SelectTrigger className="bg-background text-foreground border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {ICON_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {newLink.icon_type === "custom" && (
          <div className="space-y-2">
            <Label className="text-foreground">Custom Icon</Label>
            <FileUpload
              accept="image"
              value={newLink.custom_icon_url}
              onChange={(url) => setNewLink((prev) => ({ ...prev, custom_icon_url: url }))}
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
