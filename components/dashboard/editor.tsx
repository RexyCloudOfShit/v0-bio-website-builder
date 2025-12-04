"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { LogOut, Save, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileTab } from "./tabs/profile-tab"
import { BackgroundTab } from "./tabs/background-tab"
import { CardTab } from "./tabs/card-tab"
import { AudioTab } from "./tabs/audio-tab"
import { SnowTab } from "./tabs/snow-tab"
import { MouseTab } from "./tabs/mouse-tab"
import { LinksTab } from "./tabs/links-tab"
import { ProfilePreview } from "./preview"
import type { Profile, SocialLink } from "@/lib/types"

interface Props {
  initialProfile: Profile
  initialLinks: SocialLink[]
}

export function DashboardEditor({ initialProfile, initialLinks }: Props) {
  const [profile, setProfile] = useState<Profile>(initialProfile)
  const [links, setLinks] = useState<SocialLink[]>(initialLinks)
  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const updateProfile = useCallback((updates: Partial<Profile>) => {
    setProfile((p) => ({ ...p, ...updates }))
    setHasChanges(true)
  }, [])

  const save = async () => {
    setSaving(true)
    await supabase.from("profiles").update(profile).eq("id", profile.id)

    // Save links
    await supabase.from("social_links").delete().eq("profile_id", profile.id)
    if (links.length > 0) {
      await supabase.from("social_links").insert(
        links.map((link, i) => ({
          ...link,
          profile_id: profile.id,
          sort_order: i,
        })),
      )
    }

    setSaving(false)
    setHasChanges(false)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!hasChanges) return
    const timer = setTimeout(save, 30000)
    return () => clearTimeout(timer)
  }, [hasChanges, profile, links])

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <div className="w-80 border-r border-white/10 flex flex-col h-screen">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h1 className="font-bold text-white">niga.bio</h1>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.open(`https://niga.bio/${profile.username}`, "_blank")}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="w-full grid grid-cols-4 mb-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="bg">BG</TabsTrigger>
              <TabsTrigger value="card">Card</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
            </TabsList>
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="snow">Particles</TabsTrigger>
              <TabsTrigger value="mouse">Mouse</TabsTrigger>
              <TabsTrigger value="links">Links</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileTab profile={profile} onChange={updateProfile} />
            </TabsContent>
            <TabsContent value="bg">
              <BackgroundTab profile={profile} onChange={updateProfile} />
            </TabsContent>
            <TabsContent value="card">
              <CardTab profile={profile} onChange={updateProfile} />
            </TabsContent>
            <TabsContent value="audio">
              <AudioTab profile={profile} onChange={updateProfile} />
            </TabsContent>
            <TabsContent value="snow">
              <SnowTab profile={profile} onChange={updateProfile} />
            </TabsContent>
            <TabsContent value="mouse">
              <MouseTab profile={profile} onChange={updateProfile} />
            </TabsContent>
            <TabsContent value="links">
              <LinksTab links={links} onChange={setLinks} profileId={profile.id} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="p-4 border-t border-white/10">
          <Button onClick={save} className="w-full" disabled={saving || !hasChanges}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : hasChanges ? "Save Changes" : "Saved"}
          </Button>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1">
        <ProfilePreview profile={profile} links={links} />
      </div>
    </div>
  )
}
