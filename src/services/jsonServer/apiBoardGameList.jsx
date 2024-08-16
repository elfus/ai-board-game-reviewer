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

export async function getTopThree() {
  const ratedGames = await getBoardGamesPage({ page: 1, pageSize: 3 });
  return ratedGames;
}
