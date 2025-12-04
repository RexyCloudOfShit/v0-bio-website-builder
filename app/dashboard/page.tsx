import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardEditor } from "@/components/dashboard/editor"
import type { Profile, SocialLink } from "@/lib/types"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    redirect("/login")
  }

  // Fetch profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) {
    redirect("/login")
  }

  // Fetch social links
  const { data: socialLinks } = await supabase
    .from("social_links")
    .select("*")
    .eq("profile_id", user.id)
    .order("display_order", { ascending: true })

  return (
    <DashboardEditor initialProfile={profile as Profile} initialSocialLinks={(socialLinks || []) as SocialLink[]} />
  )
}
