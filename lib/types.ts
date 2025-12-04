export interface Profile {
  id: string
  username: string
  email: string
  display_name: string | null
  bio: string | null
  avatar_url: string | null

  // Background
  background_type: "color" | "image" | "video"
  background_color: string
  background_image_url: string | null
  background_video_url: string | null

  // Audio
  audio_url: string | null
  audio_autoplay: boolean
  audio_loop: boolean
  show_volume_slider: boolean
  show_bass_boost: boolean
  show_tempo_slider: boolean

  // Snow / Particles
  snow_enabled: boolean
  snow_count: number
  snow_speed: number
  snow_wind: number
  snow_size: number
  snow_color: string
  snow_opacity: number
  snow_use_image: boolean
  snow_image_url: string | null
  snow_rotation: boolean
  snow_sway: number

  // Card
  card_position_x: number
  card_position_y: number
  card_padding: number
  card_background: string
  card_border_radius: number
  card_blur: number
  card_tilt_enabled: boolean
  card_tilt_intensity: number // Added tilt intensity
  card_glow_enabled: boolean
  card_glow_color: string
  card_border_enabled: boolean
  card_border_color: string
  card_border_width: number

  name_color: string
  name_glow_enabled: boolean
  name_glow_color: string
  bio_color: string

  // Mouse
  cursor_type: "default" | "custom" | "hidden"
  cursor_image_url: string | null
  cursor_color: string
  mouse_trail_enabled: boolean
  mouse_trail_color: string
  mouse_trail_length: number
  mouse_trail_size: number
  mouse_trail_fade: boolean
  mouse_trail_rainbow: boolean
  click_effect_enabled: boolean
  click_effect_type:
    | "ripple"
    | "particles"
    | "ring"
    | "explosion"
    | "pulse"
    | "hearts"
    | "stars"
    | "confetti"
    | "smoke"
    | "lightning"
    | "fire"
    | "bubbles"
  click_effect_color: string

  // Badges
  badges: Badge[]

  // Stats
  og_title: string | null
  og_description: string | null
  og_image_url: string | null

  site_title_animated: boolean

  created_at: string
  updated_at: string

  // Click to Enter feature
  click_to_enter: boolean
}

export interface Badge {
  id: string
  name: string
  icon: string
  color: string
}

export interface SocialLink {
  id: string
  profile_id: string
  title: string
  url: string
  icon_type:
    | "discord"
    | "steam"
    | "xbox"
    | "twitter"
    | "instagram"
    | "youtube"
    | "tiktok"
    | "github"
    | "twitch"
    | "spotify"
    | "snapchat"
    | "reddit"
    | "linkedin"
    | "paypal"
    | "cashapp"
    | "custom"
  custom_icon_url: string | null
  icon_color: string | null
  background_color: string | null
  display_order: number
  created_at: string
}

export const BRAND_COLORS: Record<string, { icon: string; bg: string }> = {
  discord: { icon: "#5865F2", bg: "rgba(88, 101, 242, 0.2)" },
  steam: { icon: "#000000", bg: "rgba(0, 0, 0, 0.3)" },
  xbox: { icon: "#107C10", bg: "rgba(16, 124, 16, 0.2)" },
  twitter: { icon: "#000000", bg: "rgba(0, 0, 0, 0.3)" },
  instagram: { icon: "#E4405F", bg: "rgba(228, 64, 95, 0.2)" },
  youtube: { icon: "#FF0000", bg: "rgba(255, 0, 0, 0.2)" },
  tiktok: { icon: "#000000", bg: "rgba(255, 255, 255, 0.1)" },
  github: { icon: "#ffffff", bg: "rgba(255, 255, 255, 0.1)" },
  twitch: { icon: "#9146FF", bg: "rgba(145, 70, 255, 0.2)" },
  spotify: { icon: "#1DB954", bg: "rgba(29, 185, 84, 0.2)" },
  snapchat: { icon: "#FFFC00", bg: "rgba(255, 252, 0, 0.2)" },
  reddit: { icon: "#FF4500", bg: "rgba(255, 69, 0, 0.2)" },
  linkedin: { icon: "#0A66C2", bg: "rgba(10, 102, 194, 0.2)" },
  paypal: { icon: "#00457C", bg: "rgba(0, 69, 124, 0.2)" },
  cashapp: { icon: "#00D632", bg: "rgba(0, 214, 50, 0.2)" },
  custom: { icon: "#ffffff", bg: "rgba(255, 255, 255, 0.1)" },
}

export const DEFAULT_PROFILE: Partial<Profile> = {
  background_type: "color",
  background_color: "#0a0a0a",
  snow_enabled: false,
  snow_count: 50,
  snow_speed: 1.0,
  snow_wind: 0.0,
  snow_size: 1.0,
  snow_color: "#ffffff",
  snow_opacity: 0.8,
  snow_use_image: false,
  snow_image_url: null,
  snow_rotation: true,
  snow_sway: 1.0,
  card_position_x: 50,
  card_position_y: 50,
  card_padding: 24,
  card_background: "rgba(20, 20, 20, 0.8)",
  card_border_radius: 16,
  card_blur: 10,
  card_tilt_enabled: true,
  card_tilt_intensity: 10, // Added default tilt intensity
  card_glow_enabled: false,
  card_glow_color: "#ffffff",
  card_border_enabled: false,
  card_border_color: "rgba(255, 255, 255, 0.2)",
  card_border_width: 1,
  name_color: "#ffffff",
  name_glow_enabled: false,
  name_glow_color: "#ffffff",
  bio_color: "rgba(255, 255, 255, 0.8)",
  cursor_type: "default",
  cursor_color: "#ffffff",
  mouse_trail_enabled: false,
  mouse_trail_color: "#ffffff",
  mouse_trail_length: 20,
  mouse_trail_size: 10,
  mouse_trail_fade: true,
  mouse_trail_rainbow: false,
  click_effect_enabled: false,
  click_effect_type: "ripple",
  click_effect_color: "#ffffff",
  audio_autoplay: false,
  audio_loop: true,
  show_volume_slider: true,
  show_bass_boost: false,
  show_tempo_slider: false,
  badges: [],
  og_title: null,
  og_description: null,
  og_image_url: null,
  site_title_animated: true,
  click_to_enter: false,
}

export const PRESET_ICONS: Record<string, string> = {
  discord: "/icons/discord.svg",
  steam: "/icons/steam.svg",
  xbox: "/icons/xbox.svg",
  twitter: "/icons/twitter.svg",
  instagram: "/icons/instagram.svg",
  youtube: "/icons/youtube.svg",
  tiktok: "/icons/tiktok.svg",
  github: "/icons/github.svg",
  twitch: "/icons/twitch.svg",
  spotify: "/icons/spotify.svg",
  snapchat: "/icons/snapchat.svg",
  reddit: "/icons/reddit.svg",
  linkedin: "/icons/linkedin.svg",
  paypal: "/icons/paypal.svg",
  cashapp: "/icons/cashapp.svg",
}
