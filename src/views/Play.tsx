import { Link } from "react-router";

export default function Play() {
  // const riddles = getRiddles();
  return (
    <>
      <h1>התחלת משחק</h1>
      <Link to="/riddle">
        <button>התחל משחק</button>
      </Link>
    </>
  );
}
