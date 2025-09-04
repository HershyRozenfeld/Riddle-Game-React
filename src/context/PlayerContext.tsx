import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { PlayerProfile } from "../types";
import { playersApi } from "../api/players";

const KEY = "riddle.player";

export type PlayerContextValue = {
  player: PlayerProfile | null;
  loading: boolean;
  error: string | null;
  login: (email: string) => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  logout: () => void;
  setPlayer: (p: PlayerProfile | null) => void; // optional direct set if needed
};

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [player, setPlayer] = useState<PlayerProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // טעינת שחקן מלוקאל סטורג' בהפעלה
  useEffect(() => {
    const cached = localStorage.getItem(KEY);
    if (cached) {
      try {
        setPlayer(JSON.parse(cached));
      } catch {}
    }
  }, []);

  // שמירה אוטומטית בלוקאל סטורג'
  useEffect(() => {
    if (player) localStorage.setItem(KEY, JSON.stringify(player));
    else localStorage.removeItem(KEY);
  }, [player]);

  async function login(email: string) {
    setLoading(true);
    setError(null);
    try {
      const { profile } = await playersApi.loginByEmail(email);
      setPlayer(profile);
    } catch (e: any) {
      if (e && typeof e === "object" && "status" in e && (e as any).status === 404) {
        setError("שחקן לא נמצא. אפשר להירשם למטה.");
      } else {
        setError(e?.message || "שגיאה בהתחברות");
      }
    } finally {
      setLoading(false);
    }
  }

  async function register(name: string, email: string) {
    setLoading(true);
    setError(null);
    try {
      const p = await playersApi.register({ name, email });
      setPlayer(p);
    } catch (e: any) {
      setError(e?.message || "שגיאה בהרשמה");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setPlayer(null);
  }

  const value = useMemo(
    () => ({ player, loading, error, login, register, logout, setPlayer }),
    [player, loading, error]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
