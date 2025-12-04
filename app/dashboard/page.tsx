import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardEditor } from "@/components/dashboard/editor"
import type { Profile, SocialLink } from "@/lib/types"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) redirect("/login")

  const { data: links } = await supabase.from("social_links").select("*").eq("profile_id", user.id).order("sort_order")

  return <DashboardEditor initialProfile={profile as Profile} initialLinks={(links || []) as SocialLink[]} />
}
