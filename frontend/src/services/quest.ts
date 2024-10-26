import { ofetch } from "ofetch"
import type { QuestDetail } from "~/schemas/quest"

export async function getQuests() {
  return await ofetch<{ data: QuestDetail[] }>(`${import.meta.env.VITE_PUBLIC_API_URL}/api/quests`)
}

export async function finishQuest(questId: number, userId: number) {
  return await ofetch(`${import.meta.env.VITE_PUBLIC_API_URL}/api/users/${userId}/quests/${questId}/done`, { method: "POST" })
}
