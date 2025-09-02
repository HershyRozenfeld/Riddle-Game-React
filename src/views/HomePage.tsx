import Footer from "../components/Footer";
import Header from "../components/Header"
import { Link } from "react-router";


export default function HomePage() {
  return (
    <>
    <Header />
      <div>
        <div>
          <h1>RiddleQuest</h1>
          <p>Challenge Your Mind with Epic Riddles</p>
        </div>
        <div style={{width:'80vw',display:"flex", justifyContent: 'space-around'}}>
          <Link to='/play'>Play Game</Link>
          <Link to='/login'>Login</Link>
          <Link to='/leaderboard'>Leader board</Link>
          <Link to='/menu'>Full menu</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
