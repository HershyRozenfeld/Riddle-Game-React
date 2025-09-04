import { useEffect, useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { playersApi } from "../api/players";
import type { StatsResponse } from "../types";
import { Link } from "react-router";

export default function DashboardPage() {
  const { player } = usePlayer();
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!player) return;
    setLoading(true);
    setError(null);
    playersApi
      .stats(player.email)
      .then(setStats)
      .catch((e) => setError(e?.message || "שגיאה בטעינת סטטיסטיקות"))
      .finally(() => setLoading(false));
  }, [player]);

  if (!player) {
    return (
      <div>
        <h1>דשבורד</h1>
        <p>
          אינך מחובר/ת. <Link to="/auth">התחברות/הרשמה</Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>דשבורד</h1>
      <p>שלום {player.name}</p>
      {loading && <p>טוען סטטיסטיקות…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      {stats && (
        <div style={{ display: "grid", gap: 6, maxWidth: 360 }}>
          <div>חידות שנפתרו: {stats.stats.totalRiddles}</div>
          <div>זמן מצטבר: {stats.stats.totalTimeSeconds}s</div>
          <div>זמן ממוצע לחידה: {stats.stats.averageTimeSeconds}s</div>
          <div>
            התקדמות לפי רמות: Easy {stats.stats.levelProgress.Easy}, Medium{" "}
            {stats.stats.levelProgress.Medium}, Hard{" "}
            {stats.stats.levelProgress.Hard}
          </div>
          <div>
            שיחקת לאחרונה: {new Date(stats.lastPlayed).toLocaleString()}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <Link to="/game">להתחיל משחק</Link>
            <Link to="/riddles">ניהול חידות</Link>
            <Link to="/leaderboard">טבלת מובילים</Link>
          </div>
        </div>
      )}
    </div>
  );
}
