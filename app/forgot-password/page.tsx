"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://niga.bio/reset-password",
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0a0f]">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-pink-600/20 rounded-full blur-[100px]" />
      </div>

      <Card className="w-full max-w-md relative z-10 bg-white/[0.03] backdrop-blur-xl border-white/10">
        <CardHeader className="text-center">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 inline-block"
          >
            niga.bio
          </Link>
          <CardTitle className="text-xl text-white">Forgot Password</CardTitle>
          <CardDescription className="text-white/50">Enter your email to reset your password</CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center">
              <p className="text-sm text-white/60 mb-4">
                If an account exists with that email, you will receive a password reset link.
              </p>
              <Link href="/login">
                <Button variant="outline" className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10">
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleReset}>
              <div className="flex flex-col gap-4">
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
                </div>
                {error && <p className="text-sm text-red-400 bg-red-500/10 p-2 rounded">{error}</p>}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm text-white/40">
                Remember your password?{" "}
                <Link href="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Login
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
