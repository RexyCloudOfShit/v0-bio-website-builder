import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ProfilePage } from "@/components/profile/profile-page"
import type { Profile, SocialLink } from "@/lib/types"

const RESERVED_ROUTES = [
  "login",
  "signup",
  "dashboard",
  "auth",
  "api",
  "admin",
  "settings",
  "profile",
  "forgot-password",
  "reset-password",
  "_next",
  "favicon.ico",
]

interface Props {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: Props) {
  const { username } = await params
  const lowerUsername = username.toLowerCase()

  if (RESERVED_ROUTES.includes(lowerUsername)) {
    return {}
  }

  const supabase = await createClient()

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, bio, avatar_url, og_title, og_description, og_image_url")
    .eq("username", lowerUsername)
    .maybeSingle()

  if (!profile) {
    return {
      title: "Profile Not Found | niga.bio",
    }
  }

  return {
    title: profile.og_title || `${profile.display_name || username} | niga.bio`,
    description: profile.og_description || profile.bio || `Check out ${profile.display_name || username}'s bio page`,
    openGraph: {
      title: profile.og_title || `${profile.display_name || username} | niga.bio`,
      description: profile.og_description || profile.bio || `Check out ${profile.display_name || username}'s bio page`,
      images: profile.og_image_url ? [profile.og_image_url] : profile.avatar_url ? [profile.avatar_url] : [],
    },
  }
}

export default async function UserProfilePage({ params }: Props) {
  const { username } = await params
  const lowerUsername = username.toLowerCase()

  if (RESERVED_ROUTES.includes(lowerUsername)) {
    return null
  }

  const supabase = await createClient()

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", lowerUsername)
    .maybeSingle()

  if (error || !profile) {
    notFound()
  }

  // Increment visit count
  await supabase
    .from("profiles")
    .update({ visit_count: (profile.visit_count || 0) + 1 })
    .eq("id", profile.id)

  // Fetch social links
  const { data: socialLinks } = await supabase
    .from("social_links")
    .select("*")
    .eq("profile_id", profile.id)
    .order("display_order", { ascending: true })

  return (
    <ProfilePage profile={profile as Profile} socialLinks={(socialLinks || []) as SocialLink[]} isPreview={false} />
  )
}
