"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Profile, SocialLink } from "@/lib/types"
import { Sidebar } from "./sidebar"
import { Preview } from "./preview"
import { Button } from "@/components/ui/button"
import { Save, LogOut, ExternalLink, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface EditorProps {
  initialProfile: Profile
  initialSocialLinks: SocialLink[]
}

export function DashboardEditor({ initialProfile, initialSocialLinks }: EditorProps) {
  const [profile, setProfile] = useState<Profile>(initialProfile)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialSocialLinks)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("profile")
  const router = useRouter()

  const saveTimeoutRef = useRef<NodeJS.Timeout>()
  const autoSaveIntervalRef = useRef<NodeJS.Timeout>()
  const pendingUpdatesRef = useRef<Partial<Profile>>({})
  const hasChangesRef = useRef(false)

  useEffect(() => {
    autoSaveIntervalRef.current = setInterval(async () => {
      if (hasChangesRef.current && Object.keys(pendingUpdatesRef.current).length > 0) {
        const supabase = createClient()
        await supabase
          .from("profiles")
          .update({
            ...pendingUpdatesRef.current,
            updated_at: new Date().toISOString(),
          })
          .eq("id", profile.id)

        pendingUpdatesRef.current = {}
        hasChangesRef.current = false
      }
    }, 30000)

    return () => {
      if (autoSaveIntervalRef.current) clearInterval(autoSaveIntervalRef.current)
    }
  }, [profile.id])

  const updateProfile = useCallback(
    (updates: Partial<Profile>) => {
      setProfile((prev) => ({ ...prev, ...updates }))
      hasChangesRef.current = true

      pendingUpdatesRef.current = { ...pendingUpdatesRef.current, ...updates }

      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }

      saveTimeoutRef.current = setTimeout(async () => {
        if (Object.keys(pendingUpdatesRef.current).length === 0) return

        const supabase = createClient()
        await supabase
          .from("profiles")
          .update({
            ...pendingUpdatesRef.current,
            updated_at: new Date().toISOString(),
          })
          .eq("id", profile.id)

        pendingUpdatesRef.current = {}
        hasChangesRef.current = false
      }, 1500)
    },
    [profile.id],
  )

  const saveProfile = async () => {
    setSaving(true)

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    const supabase = createClient()

    const { error } = await supabase
      .from("profiles")
      .update({
        ...profile,
        ...pendingUpdatesRef.current,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id)

    pendingUpdatesRef.current = {}
    hasChangesRef.current = false

    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }

    setSaving(false)
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  const addSocialLink = async (link: Omit<SocialLink, "id" | "profile_id" | "created_at">) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("social_links")
      .insert({
        ...link,
        profile_id: profile.id,
      })
      .select()
      .single()

    if (data && !error) {
      setSocialLinks((prev) => [...prev, data as SocialLink])
    }
  }

  const updateSocialLink = async (id: string, updates: Partial<SocialLink>) => {
    const supabase = createClient()
    await supabase.from("social_links").update(updates).eq("id", id)

    setSocialLinks((prev) => prev.map((link) => (link.id === id ? { ...link, ...updates } : link)))
  }

  const deleteSocialLink = async (id: string) => {
    const supabase = createClient()
    await supabase.from("social_links").delete().eq("id", id)

    setSocialLinks((prev) => prev.filter((link) => link.id !== id))
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-card/50 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-bold text-primary">
            niga.bio
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">{profile.username}</span>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/${profile.username}`} target="_blank">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <ExternalLink className="w-4 h-4" />
              View Page
            </Button>
          </Link>
          <Button
            onClick={saveProfile}
            disabled={saving}
            size="sm"
            className={`gap-2 transition-colors ${saved ? "bg-green-600 hover:bg-green-700" : ""}`}
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : saved ? "Saved!" : "Save"}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          profile={profile}
          updateProfile={updateProfile}
          socialLinks={socialLinks}
          addSocialLink={addSocialLink}
          updateSocialLink={updateSocialLink}
          deleteSocialLink={deleteSocialLink}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Preview */}
        <div className="flex-1 bg-muted/30 overflow-hidden">
          <Preview profile={profile} socialLinks={socialLinks} updateProfile={updateProfile} />
        </div>
      </div>
    </div>
  )
}
