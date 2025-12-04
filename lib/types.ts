export interface Profile {
  id: string
  username: string
  email: string | null
  display_name: string | null
  bio: string | null
  avatar_url: string | null

  // Background
  background_type: "color" | "image" | "video"
  background_color: string
  background_image: string | null
  background_video: string | null

  // Audio
  audio_url: string | null
  audio_volume: number
  audio_bass_boost: boolean
  audio_tempo: number
  audio_preserve_pitch: boolean
  show_audio_controls: boolean

  // Card
  card_padding: number
  card_border_radius: number
  card_background: string
  card_blur: number
  card_glow_enabled: boolean
  card_glow_color: string
  card_tilt_enabled: boolean
  card_tilt_intensity: number
  card_border_enabled: boolean
  card_border_color: string
  card_border_width: number
  card_position_x: number
  card_position_y: number

  // Snow/Particles
  snow_enabled: boolean
  snow_count: number
  snow_speed: number
  snow_wind: number
  snow_size: number
  snow_color: string
  snow_opacity: number
  snow_image: string | null

  // Mouse
  cursor_type: "default" | "custom" | "hidden"
  cursor_color: string
  cursor_image: string | null
  trail_enabled: boolean
  trail_color: string
  trail_length: number
  trail_size: number
  trail_rainbow: boolean

  // Click effects
  click_effect_type: string
  click_effect_color: string
  click_effect_size: number

  // Other
  click_to_enter: boolean
  page_title: string | null
  page_description: string | null
  og_image: string | null

  created_at: string
  updated_at: string
}

export interface SocialLink {
  id: string
  profile_id: string
  platform: string
  url: string
  title: string | null
  icon_url: string | null
  icon_color: string | null
  sort_order: number
  created_at: string
}

export const PLATFORMS = [
  "discord",
  "steam",
  "xbox",
  "twitter",
  "instagram",
  "youtube",
  "tiktok",
  "github",
  "twitch",
  "spotify",
  "snapchat",
  "reddit",
  "linkedin",
  "kick",
  "custom",
] as const

export const BRAND_COLORS: Record<string, { icon: string; bg: string }> = {
  discord: { icon: "#5865F2", bg: "rgba(88, 101, 242, 0.2)" },
  steam: { icon: "#171a21", bg: "rgba(23, 26, 33, 0.4)" },
  xbox: { icon: "#107C10", bg: "rgba(16, 124, 16, 0.2)" },
  twitter: { icon: "#1DA1F2", bg: "rgba(29, 161, 242, 0.2)" },
  instagram: { icon: "#E4405F", bg: "rgba(228, 64, 95, 0.2)" },
  youtube: { icon: "#FF0000", bg: "rgba(255, 0, 0, 0.2)" },
  tiktok: { icon: "#000000", bg: "rgba(0, 0, 0, 0.4)" },
  github: { icon: "#ffffff", bg: "rgba(255, 255, 255, 0.1)" },
  twitch: { icon: "#9146FF", bg: "rgba(145, 70, 255, 0.2)" },
  spotify: { icon: "#1DB954", bg: "rgba(29, 185, 84, 0.2)" },
  snapchat: { icon: "#FFFC00", bg: "rgba(255, 252, 0, 0.15)" },
  reddit: { icon: "#FF4500", bg: "rgba(255, 69, 0, 0.2)" },
  linkedin: { icon: "#0A66C2", bg: "rgba(10, 102, 194, 0.2)" },
  kick: { icon: "#53FC18", bg: "rgba(83, 252, 24, 0.2)" },
  custom: { icon: "#ffffff", bg: "rgba(255, 255, 255, 0.1)" },
}

export const DEFAULT_PROFILE: Partial<Profile> = {
  background_type: "color",
  background_color: "#0a0a0a",
  audio_volume: 0.5,
  audio_bass_boost: false,
  audio_tempo: 1.0,
  audio_preserve_pitch: true,
  show_audio_controls: true,
  card_padding: 24,
  card_border_radius: 16,
  card_background: "rgba(0,0,0,0.6)",
  card_blur: 10,
  card_glow_enabled: false,
  card_glow_color: "#ffffff",
  card_tilt_enabled: false,
  card_tilt_intensity: 15,
  card_border_enabled: false,
  card_border_color: "rgba(255,255,255,0.2)",
  card_border_width: 1,
  card_position_x: 50,
  card_position_y: 50,
  snow_enabled: false,
  snow_count: 50,
  snow_speed: 1.0,
  snow_wind: 0,
  snow_size: 1.0,
  snow_color: "#ffffff",
  snow_opacity: 0.8,
  cursor_type: "default",
  cursor_color: "#ffffff",
  trail_enabled: false,
  trail_color: "#ffffff",
  trail_length: 20,
  trail_size: 4,
  trail_rainbow: false,
  click_effect_type: "none",
  click_effect_color: "#ffffff",
  click_effect_size: 30,
  click_to_enter: false,
}
