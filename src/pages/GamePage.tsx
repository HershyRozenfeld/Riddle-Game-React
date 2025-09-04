import { useEffect, useMemo, useRef, useState } from "react";
import { riddlesApi } from "../api/riddles";
import { playersApi } from "../api/players";
import type { Riddle } from "../types";
import { usePlayer } from "../context/PlayerContext";


function normalize(val: string | number) {
  const s = String(val).trim().toLowerCase();
  // אם שני הצדדים מספריים – נשווה כמספרים
  const n = Number(s);
  return Number.isFinite(n) ? n : s;
}

export default function GamePage() {
  const { player, setPlayer } = usePlayer();
  const [allRiddles, setAllRiddles] = useState<Riddle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [current, setCurrent] = useState<Riddle | null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    riddlesApi
      .list()
      .then(setAllRiddles)
      .catch((e) => setError(e?.message || "שגיאה בטעינת חידות"))
      .finally(() => setLoading(false));
  }, []);

  const unsolved = useMemo(() => {
    if (!player) return [] as Riddle[];
    const solvedSet = new Set(player.solved_riddles.map(String));
    return allRiddles.filter((r) => !solvedSet.has(String(r._id)));
  }, [allRiddles, player]);

  function pickRandom() {
    setFeedback(null);
    setAnswer("");
    if (unsolved.length === 0) {
      setCurrent(null);
      return;
    }
    const idx = Math.floor(Math.random() * unsolved.length);
    setCurrent(unsolved[idx]);
    startTimeRef.current = Date.now();
  }

  async function submit() {
    if (!player || !current || !startTimeRef.current) return;

    const timeToSolve = Math.max(
      1,
      Math.round((Date.now() - startTimeRef.current) / 1000)
    );

    const a = normalize(answer);
    const b = normalize(current.answer);

    const correct = a === b; // בדיקה קשיחה לאחר נרמול

    if (!correct) {
      setFeedback(`טעות. התשובה הנכונה: ${current.answer}`);
      return;
    }
    try {
      const res = await playersApi.submitScore({
        email: player.email,
        riddle_id: String(current._id),
        time_to_solve: timeToSolve,
        riddle_level: String(current.level),
      });

      // עדכון ה-Context: הוספת החידה לפתרונות + סטטיסטיקות חדשות
      const updated = {
        ...player,
        solved_riddles: [...player.solved_riddles, String(current._id)],
        stats: res.updatedStats,
      };
      setPlayer(updated);

      setFeedback(`נכון! זמן: ${timeToSolve}s`);
      setCurrent(null); // איפוס כדי לבחור חידה חדשה
      startTimeRef.current = null;
      setAnswer("");
    } catch (e: any) {
      setFeedback(
        "תשובה נכונה אך שמירת הציון נכשלה: " + (e?.message || "שגיאה")
      );
    }
  }

  return (
    <div>
      <h1>משחק</h1>
      {loading && <p>טוען חידות…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <div style={{ margin: "12px 0" }}>
        <button
          onClick={pickRandom}
          disabled={loading || unsolved.length === 0}
        >
          קבל/י חידה רנדומלית
        </button>
        <span style={{ marginInlineStart: 12, opacity: 0.7 }}>
          חידות זמינות: {unsolved.length}
        </span>
      </div>

      {unsolved.length === 0 && !loading && (
        <p>כל הכבוד! פתרת את כל החידות הזמינות.</p>
      )}

      {current && (
        <div style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}>
          <div>
            <b>{current.name}</b>
          </div>
          <div>רמה: {current.level}</div>
          <div style={{ marginTop: 8 }}>❓ {current.question}</div>

          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="התשובה שלך…"
            />
            <button onClick={submit} disabled={!answer.trim()}>
              שליחה
            </button>
          </div>
        </div>
      )}

      {feedback && <p style={{ marginTop: 12 }}>{feedback}</p>}
    </div>
  );
}
