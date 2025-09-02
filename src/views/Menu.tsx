import { Link } from "react-router";

export default function Menu() {
  return (
    <>
      <div>
        <h2>תפריט</h2>
        <ul>
          <li>
            <Link to="/login">Login/Register player</Link>
          </li>
          <li>
            <Link to="/play">Play the game</Link>
          </li>
          <li>Create a new riddle</li>
          <li>Read all riddles</li>
          <li>Update a riddle</li>
          <li>Delete a riddle</li>
          <li>
            <Link to="/leaderboard">View leaderboard</Link>
          </li>
          <li>View my stats</li>
          <li>
            <Link to="/">Exit</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
