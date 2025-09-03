export type LevelProgress = { Easy: number; Medium: number; Hard: number};

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
}

export type LoginResponse = { profile: PlayerProfile}