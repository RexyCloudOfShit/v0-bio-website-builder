import Link from "next/link"
import { Snowflake, Music, MousePointer, Link2, Palette, Zap } from "lucide-react"
import { AnimatedTitle } from "@/components/animated-title"

export default function HomePage() {
  const features = [
    { icon: Zap, title: "Seconds to Create", desc: "No coding needed" },
    { icon: Snowflake, title: "Particle Effects", desc: "Snow, rain & more" },
    { icon: Music, title: "Music & Video", desc: "Background media" },
    { icon: MousePointer, title: "Mouse Effects", desc: "Trails & cursors" },
    { icon: Link2, title: "Social Links", desc: "All platforms" },
    { icon: Palette, title: "Full Control", desc: "Customize everything" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-white/50 text-sm mb-6 tracking-widest uppercase">The simplest bio website builder</p>

          <AnimatedTitle />

          <p className="text-lg text-white/60 mb-3 max-w-xl mx-auto">
            Create your unique bio page with custom animations, music, and effects
          </p>

          <p className="text-white/40 mb-10">Ready in just a few clicks</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center text-base px-8 py-3 bg-white text-black hover:bg-white/90 rounded-md font-medium transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center text-base px-8 py-3 bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-md font-medium transition-colors"
            >
              Sign In
            </Link>
          </div>

          <p className="text-sm text-white/30">
            Your profile at <span className="text-purple-400 font-mono">niga.bio/yourname</span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto mt-16 px-4 w-full">
          {features.map((f, i) => (
            <div key={i} className="text-center p-4 rounded-lg bg-white/5 border border-white/5">
              <f.icon className="w-6 h-6 mx-auto mb-2 text-white/70" />
              <p className="text-sm font-medium text-white/80">{f.title}</p>
              <p className="text-xs text-white/40">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="relative z-10 py-4 text-center text-xs text-white/30 border-t border-white/5">niga.bio</footer>
    </div>
  )
}
