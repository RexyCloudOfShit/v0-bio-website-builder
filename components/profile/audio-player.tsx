"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { Volume2, VolumeX, Play, Pause, Zap } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

interface AudioPlayerProps {
  src: string
  videoRef?: React.RefObject<HTMLVideoElement | null>
  autoplay?: boolean
  loop?: boolean
  showVolume?: boolean
  showBassBoost?: boolean
  showTempo?: boolean
  isPreview?: boolean
}

export function AudioPlayer({
  src,
  videoRef,
  autoplay = false,
  loop = true,
  showVolume = true,
  showBassBoost = false,
  showTempo = false,
  isPreview = false,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const bassFilterRef = useRef<BiquadFilterNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const connectedRef = useRef(false)

  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [bassBoost, setBassBoost] = useState(false)
  const [tempo, setTempo] = useState(1)
  const [isExpanded, setIsExpanded] = useState(false)

  const audioElement = videoRef?.current || audioRef.current

  useEffect(() => {
    if (!audioElement) return
    if (autoplay) {
      audioElement
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {})
    }
  }, [audioElement, autoplay])

  useEffect(() => {
    if (!audioElement) return
    audioElement.volume = isMuted ? 0 : volume
  }, [volume, isMuted, audioElement])

  useEffect(() => {
    if (!audioElement) return
    audioElement.loop = loop
  }, [loop, audioElement])

  useEffect(() => {
    if (!audioElement) return
    audioElement.playbackRate = tempo
  }, [tempo, audioElement])

  const initAudioContext = () => {
    if (connectedRef.current) return
    const element = videoRef?.current || audioRef.current
    if (!element) return

    try {
      const ctx = new AudioContext()
      const source = ctx.createMediaElementSource(element)
      const bass = ctx.createBiquadFilter()

      bass.type = "lowshelf"
      bass.frequency.value = 200
      bass.gain.value = 0

      source.connect(bass)
      bass.connect(ctx.destination)

      audioContextRef.current = ctx
      bassFilterRef.current = bass
      sourceRef.current = source
      connectedRef.current = true
    } catch (e) {
      console.error("Failed to init audio context:", e)
    }
  }

  const togglePlay = async () => {
    const element = videoRef?.current || audioRef.current
    if (!element) return

    if (isPlaying) {
      element.pause()
      setIsPlaying(false)
    } else {
      if (showBassBoost && !connectedRef.current) {
        initAudioContext()
      }
      try {
        await element.play()
        setIsPlaying(true)
      } catch (e) {
        console.error("Failed to play:", e)
      }
    }
  }

  const toggleBassBoost = () => {
    if (!connectedRef.current) {
      initAudioContext()
    }
    if (bassFilterRef.current) {
      const newBass = !bassBoost
      bassFilterRef.current.gain.value = newBass ? 15 : 0
      setBassBoost(newBass)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    if (value[0] > 0) setIsMuted(false)
  }

  return (
    <>
      {src && !videoRef && <audio ref={audioRef} src={src} preload="auto" crossOrigin="anonymous" />}

      <div className="bg-black/80 backdrop-blur-lg rounded-lg border border-white/10 transition-all duration-200 p-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={togglePlay} className="text-white hover:bg-white/10 h-8 w-8">
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>

          {showVolume && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:bg-white/10 h-8 w-8"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>

              {isExpanded && (
                <div className="w-20">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    onValueChange={handleVolumeChange}
                    min={0}
                    max={1}
                    step={0.01}
                    className="cursor-pointer"
                  />
                </div>
              )}
            </>
          )}

          {showBassBoost && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleBassBoost}
              className={`text-white hover:bg-white/10 h-8 w-8 ${bassBoost ? "text-purple-400 bg-purple-400/20" : ""}`}
              title="Bass Boost"
            >
              <Zap className="w-4 h-4" />
            </Button>
          )}

          {showTempo && isExpanded && (
            <div className="flex items-center gap-2">
              <div className="w-16">
                <Slider
                  value={[tempo]}
                  onValueChange={([v]) => setTempo(v)}
                  min={0.5}
                  max={2}
                  step={0.1}
                  className="cursor-pointer"
                />
              </div>
              <span className="text-xs text-white/60 w-8">{tempo.toFixed(1)}x</span>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white/60 hover:bg-white/10 text-xs h-6 w-6 p-0"
          >
            {isExpanded ? "−" : "+"}
          </Button>
        </div>
      </div>
    </>
  )
}
