import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-white/50 mb-6">This page doesn't exist</p>
        <Link href="/" className="text-white hover:text-white/80 underline">
          Go home
        </Link>
      </div>
    </div>
  )
}
