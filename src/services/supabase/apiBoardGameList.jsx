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

function rank(games) {
  return games
    .slice()
    .sort((a, b) => b.overall - a.overall)
    .map((game, index) => ({ ...game, rank: index + 1 }));
}

export async function getTopThree() {
  const supaGames = await supabase.from('ai_score').select();
  
  /* NOTE: The following code might look excessive, the reason
  for it is that we are matching the structure provided by the JSON
  server. Of course this chould have been avoided by making a better
  design of the tables and endpoint APIs which could have simplified
  this function, but please keep in mind that this project was
  developed for learning purposes, in fact this comment turned out
  to be the result of that learning process.

  I will leave this function as is to match the JSON structure
  as returned by the JSON Server. By doing this we avoid modifying
  the code in GameCard.jsx
  */
  let ratedG = supaGames.data.map((game) => ({
    ...game,
    overall: calculateOverall(game),
  }));
  ratedG = rank(ratedG);

  ratedG
    .slice()
    .sort((a, b) => b.overall - a.overall)
    .slice(0, 3);
  const ids = ratedG.map((row) => row.id);

  const q = await supabase.from('games').select().in('id', ids);

  const games = [];
  for (let i = 0; i < 3; i++) {
    games.push({ ...q.data[i], score: { ...ratedG[i] }, 
      players : {
        min:q.data[i].players_min ,
        max:q.data[i].players_max ,
      },
      images: {
        default:q.data[i].images_default,
        '2x' :  q.data[i].images_2x,
        banner: q.data[i].images_banner
      },
      overall: ratedG[i].overall,
      rank: ratedG[i].rank
      } 
    );
  }
  
  return games;
}

export async function getLastUpdated() {
  const updated = await fetch(`${BASE_API_URL}/lastupdated`).then((res) =>
    res.json(),
  );
  return updated[0]; // return ISO string
}
