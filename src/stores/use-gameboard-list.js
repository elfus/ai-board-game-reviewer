import { create } from 'zustand'

const BASE_API_URL = 'http://localhost:3000'

export const useGameboardList = create((set) => ({
    games: [],
    fetchGames: async () => set({games: await fetch(`${BASE_API_URL}/games`).then((res) => res.json())}),
  }))