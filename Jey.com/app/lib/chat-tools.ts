import { tool, type InferUITools, type UIDataTypes, type UIMessage } from "ai"
import { z } from "zod"
import { PROFILE_LINKS, type ProfileLinkKey } from "./profile-links"

const PROFILE_LINK_KEYS = Object.keys(PROFILE_LINKS) as [ProfileLinkKey, ...ProfileLinkKey[]]

export const chatTools = {
  // No execute — the client renders this tool call as a button.
  showLinkButton: tool({
    description:
      "Display a clickable button that opens one of Jeya's GitHub repositories, " +
      "his GitHub profile, his project list, or RSS feed.",
    inputSchema: z.object({
      target: z.enum(PROFILE_LINK_KEYS),
    }),
  }),
}

export type ChatMessage = UIMessage<unknown, UIDataTypes, InferUITools<typeof chatTools>>
