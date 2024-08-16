import { BASE_API_URL } from '../apiConstants';

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

export async function getTopThree() {
  const ratedGames = await getBoardGamesRanked();
  return ratedGames.slice(0, 3);
}
