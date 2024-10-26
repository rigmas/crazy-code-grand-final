import { ofetch } from "ofetch"
import type { QuestDetail } from "~/schemas/quest"

export async function getQuests() {
  return await ofetch<{ data: QuestDetail[] }>(`${import.meta.env.VITE_PUBLIC_API_URL}/api/quests`)
}

export async function finishQuest(id: number) {
  return await ofetch(`${import.meta.env.VITE_PUBLIC_API_URL}/api/quests/${id}/done`)
}

export async function getUserExp() {
  return await ofetch<QuestDetail[]>(`${import.meta.env.VITE_PUBLIC_API_URL}/api/quets`)
}
