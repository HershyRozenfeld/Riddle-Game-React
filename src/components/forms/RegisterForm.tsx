import { useState } from "react";
import { usePlayer } from "../../context/PlayerContext";

export default function RegisterForm() {
  const { register, loading, error } = usePlayer();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await register(name, email);
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 8 }}>
      <label>
        שם
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        אימייל
        <input value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <button disabled={loading || !name.trim() || !email.trim()} type="submit">הרשמה</button>
      {error && <div style={{ color: "crimson" }}>{error}</div>}
    </form>
  );
}