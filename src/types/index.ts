export type LevelProgress = { Easy: number; Medium: number; Hard: number };

export type PlayerStats = {
  totalRiddles: number;
  totalTimeSeconds: number;
  averageTimeSeconds: number;
  levelProgress: LevelProgress;
};

export type PlayerProfile = {
  name: string;
  email: string;
  solved_riddles: string[];
  stats: PlayerStats;
};

export type LoginResponse = { profile: PlayerProfile };

export type Riddle = {
  _id: string;
  level: "Easy" | "Medium" | "Hard";
  name: string;
  question: string;
  answer: number | string;
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  email: string;
  totalRiddles: number;
  averageTime: number;
  levelProgress: LevelProgress;
};

export type StatsResponse = {
  name: string;
  lastPlayed: string;
  stats: PlayerStats;
};
