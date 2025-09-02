import Footer from "../components/Footer";
import Header from "../components/Header"

export default function HomePage() {
  return (
    <>
    <Header />
      <div>
        <div>
          <h1>RiddleQuest</h1>
          <p>Challenge Your Mind with Epic Riddles</p>
        </div>
        <div>
          <button>Play Game</button>
          <button>Login</button>
          <button>Leaderboard</button>
        </div>
      </div>
      <Footer />
    </>
  );
}
