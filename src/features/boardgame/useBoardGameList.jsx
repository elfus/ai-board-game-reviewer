import { useQuery } from '@tanstack/react-query';

// import server api
// TODO: Add an intermediate layer named "GenericAPI" which
// takes care of deciding whether to use jsonserver, supabase or any other
// service
import {
  getBoardGameList,
  getBoardGamesRanked,
  getTopThree,
} from '../../services/jsonServer/apiBoardGameList';

export function useBoardGameList() {
  const { isLoading, data: boardGameList } = useQuery({
    queryKey: ['boardgamelist'],
    queryFn: getBoardGameList,
  });

  return { isLoading, boardGameList };
}

export function useBoardGameRanked() {
  const { isLoading, data: boardGameRanked } = useQuery({
    queryKey: ['boardgameranked'],
    queryFn: getBoardGamesRanked,
  });

  return { isLoading, boardGameRanked };
}

export function useTopThree() {
  const { isLoading, data: topThree } = useQuery({
    queryKey: ['topthree'],
    queryFn: getTopThree,
  });

  return { isLoading, topThree };
}
