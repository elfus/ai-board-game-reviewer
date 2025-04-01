export const BASE_API_URL =
  import.meta.env.VITE_BGG_API_URL ?? `http://${window.location.hostname}:3000`;
export const USING_LOCALHOST = !BASE_API_URL.includes('supabase');