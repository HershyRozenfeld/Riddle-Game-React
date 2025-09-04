import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { playersApi } from "../api/players";
import type { LeaderboardEntry } from "../types";

export default function LeaderboardPage() {
  const [rows, setRows] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    playersApi
      .leaderboard()
      .then(setRows)
      .catch((e) => setError(e?.message || "שגיאה בטעינת טבלה"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>טבלת מובילים</h1>
      {loading && <p>טוען…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      {rows.length > 0 && (
        <table style={{ borderCollapse: "collapse", minWidth: 600 }}>
          <thead>
            <tr>
              <th style={th}>#</th>
              <th style={th}>שם</th>
              <th style={th}>אימייל</th>
              <th style={th}>חידות פתורות</th>
              <th style={th}>זמן ממוצע (ש׳׳)</th>
              <th style={th}>Easy</th>
              <th style={th}>Medium</th>
              <th style={th}>Hard</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.rank}>
                <td style={td}>{p.rank}</td>
                <td style={td}>{p.name}</td>
                <td style={td}>{p.email}</td>
                <td style={td}>{p.totalRiddles}</td>
                <td style={td}>{p.averageTime}</td>
                <td style={td}>{p.levelProgress.Easy}</td>
                <td style={td}>{p.levelProgress.Medium}</td>
                <td style={td}>{p.levelProgress.Hard}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const th: CSSProperties = {
  borderBottom: "1px solid #ccc",
  textAlign: "right",
  padding: 6,
};
const td: CSSProperties = {
  borderBottom: "1px solid #eee",
  textAlign: "right",
  padding: 6,
};
