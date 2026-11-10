// Single source of truth for the links the chat AI is allowed to surface
// as buttons. Constrained to this map so the model can never emit an
// arbitrary URL — it only picks a key.
export const PROFILE_LINKS = {
  github: { label: "Open GitHub Profile", url: "https://github.com/JeyaVardhan-L" },
  projects: { label: "View All Projects", url: "/projects" },
  forgeshell: { label: "View ForgeShell (C)", url: "https://github.com/JeyaVardhan-L/ForgeShell" },
  autonav: { label: "View AutoNav Pipeline", url: "https://github.com/JeyaVardhan-L/Baseline_tests_for_AutoNav" },
  mechxr: { label: "View MECH-XR (AR)", url: "https://github.com/JeyaVardhan-L/AR_Gear_Mechanisms" },
  stm32: { label: "View STM32 Flight Telemetry", url: "https://github.com/JeyaVardhan-L/STM32-Flight_Telemetry" },
  deadeye: { label: "View DEADeye VR", url: "https://github.com/JeyaVardhan-L/DEADeyeVR" },
  yolo: { label: "View YOLO11 Airborne Detection", url: "https://github.com/JeyaVardhan-L/Train_YOLO_Customdataset" },
  batcave: { label: "View Batcave_Cloud", url: "https://github.com/JeyaVardhan-L/Batcave_Cloud" },
  ledgerlab: { label: "View LedgerLab Sandbox", url: "https://github.com/JeyaVardhan-L/LedgerLab" },
  rss: { label: "Subscribe via RSS", url: "/rss" },
} as const

export type ProfileLinkKey = keyof typeof PROFILE_LINKS
