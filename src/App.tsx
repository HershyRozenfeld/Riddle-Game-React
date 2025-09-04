import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Layout from "./components/Layout";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import GamePage from "./pages/GamePage";
import RiddlesPage from "./pages/RiddlesPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import { PlayerProvider, usePlayer } from "./context/PlayerContext";

function Protected({ children }: { children: React.ReactElement }) {
  const { player } = usePlayer();
  if (!player) return <Navigate to="/auth" replace />;
  return children;
}

export default function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="auth" element={<AuthPage />} />
            <Route
              path="game"
              element={
                <Protected>
                  <GamePage />
                </Protected>
              }
            />
            <Route
              path="riddles"
              element={
                <Protected>
                  <RiddlesPage />
                </Protected>
              }
            />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PlayerProvider>
  );
}
