import { create } from 'zustand';

const BASE_API_URL = 'http://localhost:3000';

export function sumScore(score) {
  const scoreKeys = Object.keys(score);
  const propertyCount = scoreKeys.length;
  let sum = 0;
  for (const property of scoreKeys) {
    sum += score[property];
  }
  return (sum / propertyCount).toFixed(2);
}

export const useGameboardList = create((set) => ({
  games: [],
  ranked: [],
  desc: false,
  fetchGames: async () =>
    set({
      games: await fetch(`${BASE_API_URL}/games`).then((res) => res.json()),
    }),
  rankDescending: async () => {
    set((state) => ({
      ranked: state.games
        .slice()
        .sort((a, b) => sumScore(b.score) - sumScore(a.score)),
    }));
  },
  toggleDescending: () => set((state)=>({ desc: !state.desc })),
}));
