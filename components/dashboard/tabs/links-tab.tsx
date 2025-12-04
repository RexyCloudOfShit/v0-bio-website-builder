"use client"

import { useState } from "react"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUpload } from "@/components/ui/file-upload"
import { PLATFORMS } from "@/lib/types"
import type { SocialLink } from "@/lib/types"

interface Props {
  links: SocialLink[]
  onChange: (links: SocialLink[]) => void
  profileId: string
}

export function LinksTab({ links, onChange, profileId }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null)

  const addLink = () => {
    const newLink: SocialLink = {
      id: crypto.randomUUID(),
      profile_id: profileId,
      platform: "custom",
      url: "",
      title: null,
      icon_url: null,
      icon_color: null,
      sort_order: links.length,
      created_at: new Date().toISOString(),
    }
    onChange([...links, newLink])
    setExpanded(newLink.id)
  }

  const updateLink = (id: string, updates: Partial<SocialLink>) => {
    onChange(links.map((l) => (l.id === id ? { ...l, ...updates } : l)))
  }

  const removeLink = (id: string) => {
    onChange(links.filter((l) => l.id !== id))
  }

  return (
    <div className="space-y-4">
      {links.map((link) => (
        <div key={link.id} className="border border-white/10 rounded-lg p-3">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setExpanded(expanded === link.id ? null : link.id)}
          >
            <GripVertical className="w-4 h-4 text-white/30" />
            <span className="flex-1 text-white/70 text-sm truncate">
              {PLATFORMS.find((p) => p.id === link.platform)?.name || link.platform}
              {link.url && ` - ${link.url}`}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation()
                removeLink(link.id)
              }}
            >
              <Trash2 className="w-3 h-3 text-red-400" />
            </Button>
          </div>

          {expanded === link.id && (
            <div className="mt-3 space-y-3 pt-3 border-t border-white/10">
              <div>
                <Label className="text-white/70 text-xs">Platform</Label>
                <Select value={link.platform} onValueChange={(v) => updateLink(link.id, { platform: v })}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white/70 text-xs">URL</Label>
                <Input
                  value={link.url}
                  onChange={(e) => updateLink(link.id, { url: e.target.value })}
                  className="bg-white/5 border-white/10 text-white mt-1"
                  placeholder="https://..."
                />
              </div>

              <div>
                <Label className="text-white/70 text-xs">Label (optional)</Label>
                <Input
                  value={link.title || ""}
                  onChange={(e) => updateLink(link.id, { title: e.target.value || null })}
                  className="bg-white/5 border-white/10 text-white mt-1"
                  placeholder="Display text"
                />
              </div>

              {link.platform === "custom" && (
                <div>
                  <Label className="text-white/70 text-xs">Custom Icon</Label>
                  <FileUpload
                    value={link.icon_url}
                    onChange={(url) => updateLink(link.id, { icon_url: url })}
                    type="image"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      <Button onClick={addLink} variant="outline" className="w-full border-dashed bg-transparent">
        <Plus className="w-4 h-4 mr-2" /> Add Link
      </Button>
    </div>
  )
}
