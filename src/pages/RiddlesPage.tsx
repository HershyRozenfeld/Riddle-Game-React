import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { riddlesApi } from "../api/riddles";
import type { Riddle } from "../types";

export default function RiddlesPage() {
  const [riddles, setRiddles] = useState<Riddle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // יצירה
  const [level, setLevel] = useState("Easy");
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // עריכה
  const [editingId, setEditingId] = useState<string | null>(null);
  const [edit, setEdit] = useState<Partial<Riddle>>({});

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const list = await riddlesApi.list();
      setRiddles(list);
    } catch (e: any) {
      setError(e?.message || "שגיאה בטעינת חידות");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const grouped = useMemo(() => {
    const m = new Map<string, Riddle[]>();
    for (const r of riddles) {
      const key = r.level || "Unknown";
      if (!m.has(key)) m.set(key, []);
      m.get(key)!.push(r);
    }
    return Array.from(m.entries());
  }, [riddles]);

  async function createRiddle(e: FormEvent) {
    e.preventDefault();
    try {
      const num = Number(answer);
      const payload: Partial<Riddle> = {
        level,
        name: name.trim(),
        question: question.trim(),
        answer: Number.isFinite(num) ? num : answer.trim(),
      } as any;
      const created = await riddlesApi.create(payload);
      setRiddles((prev) => [created, ...prev]);
      setName("");
      setQuestion("");
      setAnswer("");
      setLevel("Easy");
    } catch (e: any) {
      alert("שגיאה ביצירת חידה: " + (e?.message || "שגיאה"));
    }
  }

  function beginEdit(r: Riddle) {
    setEditingId(r._id);
    setEdit({ name: r.name, question: r.question, answer: r.answer, level: r.level });
  }

  async function saveEdit(id: string) {
    try {
      const payload: Partial<Riddle> = { ...edit };
      if (typeof payload.answer === "string") {
        const n = Number(payload.answer);
        if (Number.isFinite(n)) payload.answer = n as any;
      }
      await riddlesApi.update(id, payload);
      setRiddles((prev) => prev.map((r) => (r._id === id ? { ...r, ...payload } : r)));
      setEditingId(null);
      setEdit({});
    } catch (e: any) {
      alert("שגיאה בעדכון: " + (e?.message || "שגיאה"));
    }
  }

  async function remove(id: string) {
    if (!confirm("למחוק חידה זו?")) return;
    try {
      await riddlesApi.remove(id);
      setRiddles((prev) => prev.filter((r) => r._id !== id));
    } catch (e: any) {
      alert("שגיאה במחיקה: " + (e?.message || "שגיאה"));
    }
  }

  return (
    <div>
      <h1>חידות</h1>
      {loading && <p>טוען…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <section style={{ border: "1px solid #eee", padding: 12, borderRadius: 8, marginBottom: 16 }}>
        <h3>יצירת חידה חדשה</h3>
        <form onSubmit={createRiddle} style={{ display: "grid", gap: 8, maxWidth: 600 }}>
          <label>
            רמה
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </label>
          <label>
            שם
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            תיאור/שאלה
            <input value={question} onChange={(e) => setQuestion(e.target.value)} required />
          </label>
          <label>
            תשובה (מספר/טקסט)
            <input value={answer} onChange={(e) => setAnswer(e.target.value)} required />
          </label>
          <button type="submit">צור/צרי</button>
        </form>
      </section>

      <section>
        <h3>כל החידות</h3>
        {grouped.map(([lvl, list]) => (
          <div key={lvl} style={{ marginBottom: 18 }}>
            <h4>{lvl}</h4>
            <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 8 }}>
              {list.map((r) => (
                <li key={r._id} style={{ border: "1px solid #eee", padding: 8, borderRadius: 8 }}>
                  {editingId === r._id ? (
                    <div style={{ display: "grid", gap: 6 }}>
                      <label>
                        שם
                        <input
                          value={edit.name ?? ""}
                          onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                        />
                      </label>
                      <label>
                        תיאור/שאלה
                        <input
                          value={edit.question ?? ""}
                          onChange={(e) => setEdit({ ...edit, question: e.target.value })}
                        />
                      </label>
                      <label>
                        תשובה
                        <input
                          value={String(edit.answer ?? "")}
                          onChange={(e) => setEdit({ ...edit, answer: e.target.value })}
                        />
                      </label>
                      <label>
                        רמה
                        <select
                          value={String(edit.level ?? r.level)}
                          onChange={(e) => setEdit({ ...edit, level: e.target.value })}
                        >
                          <option>Easy</option>
                          <option>Medium</option>
                          <option>Hard</option>
                        </select>
                      </label>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => saveEdit(r._id)}>שמור</button>
                        <button onClick={() => setEditingId(null)}>בטל</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "grid", gap: 6 }}>
                      <div>📝 <b>{r.name}</b> — <span style={{ opacity: 0.7 }}>{r._id}</span></div>
                      <div>🎯 רמה: {r.level}</div>
                      <div>❓ {r.question}</div>
                      <div>✅ תשובה: {String(r.answer)}</div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => beginEdit(r)}>ערוך/ערכי</button>
                        <button onClick={() => remove(r._id)}>מחק/י</button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}