import { Link } from "react-router";
import { usePlayer } from "../context/PlayerContext";

export default function Navbar() {
  const { player, logout } = usePlayer();
  return (
    <nav style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #eee", direction: "rtl" }}>
      <Link to="/">בית</Link>
      <Link to="/game">משחק</Link>
      <Link to="/riddles">חידות</Link>
      <Link to="/leaderboard">טבלת מובילים</Link>
      <div style={{ marginInlineStart: "auto" }} />
      {player ? (
        <>
          <span>שלום, {player.name}</span>
          <button onClick={logout}>התנתק</button>
        </>
      ) : (
        <Link to="/auth">התחברות</Link>
      )}
    </nav>
  );
}
