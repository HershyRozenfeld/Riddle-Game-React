import { useState } from "react";
import { usePlayer } from "../../context/PlayerContext";

export default function LoginForm() {
  const { login, loading, error } = usePlayer();
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await login(email);
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 8 }}>
      <label>
        אימייל
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="@example.com"
          required
        />
      </label>
      <button disabled={loading || !email.trim()} type="submit">התחבר/י</button>
      {error && <div style={{ color: "crimson" }}>{error}</div>}
    </form>
  );
}
