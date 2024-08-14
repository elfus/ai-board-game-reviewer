import { BASE_API_URL } from '../apiConstants';

function sumScore(score, rating) {
  const scoreKeys = Object.keys(score);
  const propertyCount = scoreKeys.length + 1;
  let sum = rating;
  for (const property of scoreKeys) {
    sum += score[property];
  }
  return Number((sum / propertyCount).toFixed(2));
}

function rank(games) {
  return games
    .slice()
    .sort((a, b) => b.overall - a.overall)
    .map((game, index) => ({ ...game, rank: index + 1 }));
}

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

  // Calculate an overall score with the function sumScore
  const ratedGames = scoredGames.map((game) => ({
    ...game,
    overall: sumScore(game.score, game.rating),
  }));

  // The rank function will assign a rank 1 to the board game
  // with the highest overall score.
  return rank(ratedGames);
}

export async function getTopThree() {
  const ratedGames = await getBoardGamesRanked();
  return ratedGames.slice(0, 3);
}
