import { BASE_API_URL } from '../apiConstants';

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

export async function getLastUpdated() {
  const updated = await fetch(`${BASE_API_URL}/lastupdated`).then((res) =>
    res.json(),
  );
  return updated[0]; // return ISO string
}
