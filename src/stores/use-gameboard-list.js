import { create } from 'zustand';

const BASE_API_URL = 'http://localhost:3000';

export function sumScore(score) {
  const propertyCount = Object.keys(score).length;
  let sum = 0;
  for (const property of Object.keys(score)) {
    sum += score[property];
  }
  return (sum / propertyCount).toFixed(2);
}

export const useGameboardList = create((set) => ({
  games: [],
  rankedDesc: [],
  fetchGames: async () =>
    set({
      games: await fetch(`${BASE_API_URL}/games`).then((res) => res.json()),
    }),
  getRankedDescending: async () => {
    set((state) => ({
      rankedDesc: state.games
        .slice()
        .sort((a, b) => sumScore(b.score) - sumScore(a.score)),
    }));
  },
}));
