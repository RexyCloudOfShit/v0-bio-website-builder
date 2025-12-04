"use client"

import type { Profile, SocialLink } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileTab } from "./tabs/profile-tab"
import { BackgroundTab } from "./tabs/background-tab"
import { SnowTab } from "./tabs/snow-tab"
import { AudioTab } from "./tabs/audio-tab"
import { CardTab } from "./tabs/card-tab"
import { MouseTab } from "./tabs/mouse-tab"
import { LinksTab } from "./tabs/links-tab"
import { EmbedTab } from "./tabs/embed-tab"
import { User, ImageIcon, Snowflake, Music, CreditCard, MousePointer, Link2, Share2 } from "lucide-react"

interface SidebarProps {
  profile: Profile
  updateProfile: (updates: Partial<Profile>) => void
  socialLinks: SocialLink[]
  addSocialLink: (link: Omit<SocialLink, "id" | "profile_id" | "created_at">) => void
  updateSocialLink: (id: string, updates: Partial<SocialLink>) => void
  deleteSocialLink: (id: string) => void
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Sidebar({
  profile,
  updateProfile,
  socialLinks,
  addSocialLink,
  updateSocialLink,
  deleteSocialLink,
  activeTab,
  setActiveTab,
}: SidebarProps) {
  return (
    <div className="w-80 border-r border-border bg-card/50 backdrop-blur-sm flex flex-col h-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <TabsList className="grid grid-cols-8 gap-1 p-2 bg-transparent h-auto shrink-0">
          <TabsTrigger value="profile" className="p-2" title="Profile">
            <User className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="background" className="p-2" title="Background">
            <ImageIcon className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="snow" className="p-2" title="Particles">
            <Snowflake className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="audio" className="p-2" title="Audio">
            <Music className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="card" className="p-2" title="Card">
            <CreditCard className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="mouse" className="p-2" title="Mouse Effects">
            <MousePointer className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="links" className="p-2" title="Links">
            <Link2 className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="embed" className="p-2" title="Embed/OG">
            <Share2 className="w-4 h-4" />
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
          <div className="p-4">
            <TabsContent value="profile" className="m-0">
              <ProfileTab profile={profile} updateProfile={updateProfile} />
            </TabsContent>
            <TabsContent value="background" className="m-0">
              <BackgroundTab profile={profile} updateProfile={updateProfile} />
            </TabsContent>
            <TabsContent value="snow" className="m-0">
              <SnowTab profile={profile} updateProfile={updateProfile} />
            </TabsContent>
            <TabsContent value="audio" className="m-0">
              <AudioTab profile={profile} updateProfile={updateProfile} />
            </TabsContent>
            <TabsContent value="card" className="m-0">
              <CardTab profile={profile} updateProfile={updateProfile} />
            </TabsContent>
            <TabsContent value="mouse" className="m-0">
              <MouseTab profile={profile} updateProfile={updateProfile} />
            </TabsContent>
            <TabsContent value="links" className="m-0">
              <LinksTab
                socialLinks={socialLinks}
                addSocialLink={addSocialLink}
                updateSocialLink={updateSocialLink}
                deleteSocialLink={deleteSocialLink}
              />
            </TabsContent>
            <TabsContent value="embed" className="m-0">
              <EmbedTab profile={profile} updateProfile={updateProfile} />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
