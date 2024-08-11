import { BASE_API_URL } from '../apiConstants';

export async function getBoardGameList() {
  const allGames = await fetch(`${BASE_API_URL}/games`).then((res) =>
    res.json(),
  );
  return allGames;
}
