import { ofetch } from "ofetch"
import type { User } from "~/schemas/user"

export async function profileUsers(email: string) {
  return await ofetch<{ data: User }>(`${import.meta.env.VITE_PUBLIC_API_URL}/api/qr/scan`, {
    method: "POST",
    body: { email },
  })
}

export async function getUserExp(userId: number) {
  return await ofetch<{ data: { xp: string } | null }>(`${import.meta.env.VITE_PUBLIC_API_URL}/api/users/${userId}/xp`)
}

export interface UserDetail extends User {
  total_xp: string
}

export interface UserParsed extends User {
  total_xp: number
}
export async function getAllUser(): Promise<UserParsed[]> {
  const res = await ofetch<{ data: UserDetail[] }>(`${import.meta.env.VITE_PUBLIC_API_URL}/api/users`)
  return res.data.map(r => ({ ...r, total_xp: Number.parseInt(r.total_xp) }))
}
