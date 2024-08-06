import { create } from 'zustand';

const BASE_API_URL = `http://${window.location.hostname}`;
//const BASE_API_URL = `http://${window.location.hostname}:3000`;

function sumScore(score, rating) {
  const scoreKeys = Object.keys(score);
  const propertyCount = scoreKeys.length + 1;
  let sum = rating;
  for (const property of scoreKeys) {
    sum += score[property];
  }
  return Number((sum / propertyCount).toFixed(2));
}

function rank(games){
  return games.slice()
  .sort((a, b) => b.overall - a.overall)
  .map((game, index) => ({...game, rank: index + 1}));
}

export const useGameboardList = create((set) => ({
  games: [],
  ranked: [],
  top: [],
  desc: true,
  fetchGames: async () =>{
    const allGames = await fetch(`${BASE_API_URL}/games`).then((res) => res.json());
    const onlyRatedGames = allGames
    .filter((game) => Object.values(game.score).every((score) => score >= 0 && score <= 10))
    .map((game) => ({...game, overall: sumScore(game.score, game.rating)}));

    set({
      games: onlyRatedGames,
      top: rank(onlyRatedGames).slice(0, 3),
    })
  },
  rankDescending: async () => {
    set((state) => ({
      ranked: rank(state.games),
    }));
  },
  toggleDescending: () => set((state)=>({ desc: !state.desc })),
}));
