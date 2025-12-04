import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-blue-900/20" />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Profile Not Found</h2>
        <p className="text-muted-foreground mb-8">This bio page doesn&apos;t exist yet. Want to claim it?</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg">Create Your Page</Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="outline">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
