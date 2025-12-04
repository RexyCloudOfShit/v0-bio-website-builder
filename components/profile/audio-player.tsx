"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import type { Profile } from "@/lib/types"

interface Props {
  profile: Profile
  src: string
}

export function AudioPlayer({ profile, src }: Props) {
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(profile.audio_volume)
  const audioRef = useRef<HTMLAudioElement>(null)
  const contextRef = useRef<AudioContext | null>(null)
  const bassRef = useRef<BiquadFilterNode | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume
    audio.playbackRate = profile.audio_tempo
    audio.preservesPitch = profile.audio_preserve_pitch

    // Setup bass boost
    if (profile.audio_bass_boost && !contextRef.current) {
      const ctx = new AudioContext()
      const source = ctx.createMediaElementSource(audio)
      const bass = ctx.createBiquadFilter()
      bass.type = "lowshelf"
      bass.frequency.value = 200
      bass.gain.value = 15
      source.connect(bass)
      bass.connect(ctx.destination)
      contextRef.current = ctx
      bassRef.current = bass
    }
  }, [volume, profile.audio_tempo, profile.audio_preserve_pitch, profile.audio_bass_boost])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
    } else {
      await audio.play()
    }
    setPlaying(!playing)
  }

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm">
      <audio ref={audioRef} src={src} loop crossOrigin="anonymous" />

      <button onClick={togglePlay} className="p-2 rounded-full hover:bg-white/10">
        {playing ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
      </button>

      <Volume2 className="w-4 h-4 text-white/50" />
      <Slider
        value={[volume]}
        onValueChange={([v]) => {
          setVolume(v)
          if (audioRef.current) audioRef.current.volume = v
        }}
        min={0}
        max={1}
        step={0.05}
        className="w-24"
      />
    </div>
  )
}
