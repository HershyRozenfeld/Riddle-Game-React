import type { LoginResponse, PlayerProfile, StatsResponse, LeaderboardEntry } from "../types";

const BASE_URL = "https://riddle-game-en69.onrender.com";

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, init);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(text || `${res.status} ${res.statusText}`) as any;
    err.status = res.status;
    throw err;
  }
  if (res.status === 204) return undefined as unknown as T;
  return (await res.json()) as T;
}

export const playersApi = {
  loginByEmail: (email: string) =>
    request<LoginResponse>(`/api/players/player/${encodeURIComponent(email.trim().toLowerCase())}`),

  register: (payload: { name: string; email: string }) =>
    request<PlayerProfile>("/api/players/player", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),

  stats: (email: string) =>
    request<StatsResponse>(`/api/players/stats/${encodeURIComponent(email.trim().toLowerCase())}`),

  leaderboard: () => request<LeaderboardEntry[]>("/api/players/leaderboard"),

  submitScore: (payload: {
    email: string;
    riddle_id: string;
    time_to_solve: number;
    riddle_level: string;
  }) =>
    request<{ updatedStats: StatsResponse["stats"] }>("/api/players/submit-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
};