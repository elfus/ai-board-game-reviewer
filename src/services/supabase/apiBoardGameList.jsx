import { BASE_API_URL } from '../apiConstants';
import supabase from '../supabase';

export async function getBoardGameList() {
  const allGames = await fetch(`${BASE_API_URL}/games`).then((res) =>
    res.json(),
  );
  return allGames;
}

export async function getBoardGamesRanked() {
  // This REST call will get ALL the board games
  const scoredGames = await fetch(`${BASE_API_URL}/games?score.fun_gte=1`).then(
    (res) => res.json(),
  );

  return scoredGames;
}

export async function getBoardGamesPage({ page, pageSize }) {
  // This REST call will get ALL the board games
  if (!page || !pageSize) return null;

  const gamesPage = await fetch(
    `${BASE_API_URL}/games?_page=${page}&_limit=${pageSize}`,
  ).then((res) => res.json());
  return gamesPage;
}

export async function getBoardGamesCount() {
  const count = await fetch(`${BASE_API_URL}/count`).then((res) => res.json());

  return count[0];
}

function calculateOverall(game) {
  let sum = 0;
  sum += game.difficulty;
  sum += game.fun;
  sum += game.learning_curve;
  const propertyCount = 3;
  return Number((sum / propertyCount).toFixed(2));
}

export async function getTopThree() {
  const supaGames = await supabase.from('ai_score').select();

  let ratedG = supaGames.data.map((game) => ({
    ...game,
    overall: calculateOverall(game),
  }));
  ratedG = ratedG
    .slice()
    .sort((a, b) => b.overall - a.overall)
    .slice(0, 3);
  const ids = ratedG.map((row) => row.id);

  const q = await supabase.from('games').select().in('id', ids);

  const games = [];
  for (let i = 0; i < 3; i++) {
    games.push({ ...q.data[i], score: { ...ratedG[i] } });
  }
  console.log(games);
  // const ratedGames = await getBoardGamesPage({ page: 1, pageSize: 3 });
  return games;
}

export async function getLastUpdated() {
  const updated = await fetch(`${BASE_API_URL}/lastupdated`).then((res) =>
    res.json(),
  );
  return updated[0]; // return ISO string
}
