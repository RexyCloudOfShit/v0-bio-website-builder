import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-blue-900/20" />

      <Card className="w-full max-w-md relative z-10 bg-card/80 backdrop-blur-xl border-border">
        <CardHeader className="text-center">
          <Link href="/" className="text-2xl font-bold text-primary mb-2">
            niga.bio
          </Link>
          <CardTitle className="text-xl text-destructive">Authentication Error</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-4">{params.error || "An error occurred during authentication."}</p>
          <Link href="/login" className="text-primary underline underline-offset-4">
            Try again
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
