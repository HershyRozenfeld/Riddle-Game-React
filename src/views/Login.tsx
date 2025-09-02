import { Link } from "react-router";

export default function Login() {
  return (
    <>
      <h2>התחברות / הרשמה</h2>
      <form>
        <div>
          <label htmlFor="email">אימייל:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">סיסמה:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div>
          <Link to="/play">
            <button type="submit">התחבר</button>
            <button type="button">הרשם</button>
          </Link>
        </div>
      </form>
    </>
  );
}
