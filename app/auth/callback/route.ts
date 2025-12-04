import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/dashboard"

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Use production URL in production, origin in development
      const baseUrl = process.env.NODE_ENV === "production" ? "https://niga.bio" : origin
      return NextResponse.redirect(`${baseUrl}${next}`)
    }
  }

  // Return to error page if code exchange failed
  const errorUrl = process.env.NODE_ENV === "production" ? "https://niga.bio/auth/error" : `${origin}/auth/error`
  return NextResponse.redirect(errorUrl)
}
