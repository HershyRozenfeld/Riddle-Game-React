import type { Riddle } from "../types";

const BASE_URL = "http://localhost:3000";

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

export const riddlesApi = {
  list: () => request<Riddle[]>("/api/riddles"),
  create: (payload: Partial<Riddle>) =>
    request<Riddle>("/api/riddles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
  update: (id: string, payload: Partial<Riddle>) =>
    request<string>(`/api/riddles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
  remove: (id: string) =>
    request<string>(`/api/riddles/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }),
};