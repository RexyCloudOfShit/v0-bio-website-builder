import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ProfilePage } from "@/components/profile/profile-page"
import type { Profile, SocialLink } from "@/lib/types"
import type { Metadata } from "next"

const RESERVED_ROUTES = ["login", "signup", "dashboard", "forgot-password", "reset-password", "auth", "api"]

interface Props {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  if (RESERVED_ROUTES.includes(username)) return {}

  const supabase = await createClient()
  const { data: profile } = await supabase.from("profiles").select("*").eq("username", username).single()

  if (!profile) return {}

  return {
    title: profile.page_title || `${profile.display_name || profile.username} - niga.bio`,
    description: profile.page_description || profile.bio || `Check out ${profile.username}'s bio page`,
    openGraph: {
      title: profile.page_title || `${profile.display_name || profile.username} - niga.bio`,
      description: profile.page_description || profile.bio || undefined,
      images: profile.og_image ? [profile.og_image] : undefined,
    },
  }
}

export default async function UserProfilePage({ params }: Props) {
  const { username } = await params

  if (RESERVED_ROUTES.includes(username)) notFound()

  const supabase = await createClient()

  const { data: profile } = await supabase.from("profiles").select("*").eq("username", username).single()

  if (!profile) notFound()

  const { data: links } = await supabase
    .from("social_links")
    .select("*")
    .eq("profile_id", profile.id)
    .order("sort_order")

  return <ProfilePage profile={profile as Profile} links={(links || []) as SocialLink[]} />
}
