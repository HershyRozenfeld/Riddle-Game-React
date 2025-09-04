import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import { useState } from "react";

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  return (
    <div>
      <h1>ברוך הבא ל־Riddle Game</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => setTab("login")} disabled={tab === "login"}>כניסה</button>
        <button onClick={() => setTab("register")} disabled={tab === "register"}>הרשמה</button>
      </div>
      {tab === "login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}