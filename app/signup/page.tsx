"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Loader2, Sparkles } from "lucide-react"

const PRODUCTION_URL = "https://niga.bio"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [attempts, setAttempts] = useState<number[]>([])
  const [cooldownEnd, setCooldownEnd] = useState<number | null>(null)
  const [cooldownRemaining, setCooldownRemaining] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (!cooldownEnd) return
    const interval = setInterval(() => {
      const remaining = Math.ceil((cooldownEnd - Date.now()) / 1000)
      if (remaining <= 0) {
        setCooldownEnd(null)
        setCooldownRemaining(0)
        setAttempts([])
      } else {
        setCooldownRemaining(remaining)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [cooldownEnd])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    const now = Date.now()
    if (cooldownEnd && now < cooldownEnd) {
      setError(`Too many attempts. Please wait ${cooldownRemaining} seconds.`)
      return
    }

    const recentAttempts = attempts.filter((t) => now - t < 10000)
    if (recentAttempts.length >= 5) {
      setCooldownEnd(now + 60000)
      setCooldownRemaining(60)
      setError("Too many attempts. Please wait 60 seconds.")
      return
    }

    setAttempts([...recentAttempts, now])
    setIsLoading(true)
    setError(null)

    const cleanUsername = username.toLowerCase().trim()

    if (!/^[a-zA-Z0-9_-]+$/.test(cleanUsername)) {
      setError("Username can only contain letters, numbers, underscores and hyphens")
      setIsLoading(false)
      return
    }

    if (cleanUsername.length < 3 || cleanUsername.length > 20) {
      setError("Username must be between 3 and 20 characters")
      setIsLoading(false)
      return
    }

    const reserved = [
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
    ]
    if (reserved.includes(cleanUsername)) {
      setError("This username is reserved")
      setIsLoading(false)
      return
    }

    const supabase = createClient()

    const { data: existingUser } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", cleanUsername)
      .maybeSingle()

    if (existingUser) {
      setError("Username is already taken")
      setIsLoading(false)
      return
    }

    try {
      const redirectUrl = process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${PRODUCTION_URL}/auth/callback`

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            username: cleanUsername,
            display_name: username,
          },
        },
      })

      if (signUpError) throw signUpError

      if (data.user) {
        // Try to sign in immediately
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (signInError) {
          // Email confirmation might be required
          router.push("/login?message=Account created! Check your email to confirm, then sign in.")
        } else {
          router.push("/dashboard")
        }
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0a0f]">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-pink-600/20 rounded-full blur-[100px]" />
      </div>

      <Card className="w-full max-w-md relative z-10 bg-white/[0.03] backdrop-blur-xl border-white/10">
        <CardHeader className="text-center pb-2">
          <Link
            href="/"
            className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 inline-block"
          >
            niga.bio
          </Link>
          <CardTitle className="text-xl text-white flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Create your bio page
          </CardTitle>
          <CardDescription className="text-white/50">Ready in just a few clicks</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-white/80">
                  Username
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-white/40 text-sm shrink-0">niga.bio/</span>
                  <Input
                    id="username"
                    type="text"
                    placeholder="yourname"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                    className="flex-1 bg-white/5 border-white/10 focus:border-purple-500/50 text-white placeholder:text-white/30"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-white/80">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-purple-500/50 text-white placeholder:text-white/30"
                />
                <p className="text-xs text-white/30">Only used for password recovery</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-white/80">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-purple-500/50 text-white"
                />
              </div>
              {error && <p className="text-sm text-red-400 bg-red-500/10 p-2 rounded">{error}</p>}
              {cooldownRemaining > 0 && (
                <p className="text-sm text-yellow-400 bg-yellow-500/10 p-2 rounded">
                  Please wait {cooldownRemaining}s before trying again
                </p>
              )}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
                disabled={isLoading || cooldownRemaining > 0}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : cooldownRemaining > 0 ? (
                  `Wait ${cooldownRemaining}s`
                ) : (
                  "Get Started"
                )}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-white/40">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
