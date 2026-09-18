export const SITE_LINKS = {
  discord: process.env.NEXT_PUBLIC_DISCORD_URL || "https://discord.gg/darkevo",
  launcher: process.env.NEXT_PUBLIC_LAUNCHER_URL || "https://github.com/Ozkntr/darkevo/releases/latest",
} as const;

export function outboundProps(href: string) {
  if (!href.startsWith("http")) return {};
  return { target: "_blank" as const, rel: "noopener noreferrer" };
}
