import { useQueryClient, useQuery } from '@tanstack/react-query';

// import server api
// TODO: Add an intermediate layer named "GenericAPI" which
// takes care of deciding whether to use jsonserver, supabase or any other
// service
import {
  getBoardGameList,
  getBoardGamesRanked,
  getTopThree,
  getBoardGamesPage,
  getBoardGamesCount,
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

export function useBoardGamePage(page, pageSize) {
  const { isLoadingCount, boardGameCount } = useBoardGameCount();
  const { isLoading, data: boardGamePage } = useQuery({
    queryKey: ['boardgamepage', page, pageSize],
    queryFn: () => getBoardGamesPage({ page, pageSize }),
  });
  const queryClient = useQueryClient();

  if (isLoadingCount || !page || !pageSize) return null;

  if (page < Math.ceil(boardGameCount / pageSize))
    queryClient.prefetchQuery({
      queryKey: ['boardgamepage', page + 1, pageSize],
      queryFn: () => getBoardGamesPage({ page: page + 1, pageSize }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['boardgamepage', page - 1, pageSize],
      queryFn: () => getBoardGamesPage({ page: page - 1, pageSize }),
    });

  return { isLoading, boardGamePage };
}

export function useBoardGameCount() {
  const { isLoading, data: boardGameCount } = useQuery({
    queryKey: ['boardgamecount'],
    queryFn: () => getBoardGamesCount(),
  });
  return { isLoading, boardGameCount };
}

export function useTopThree() {
  const { isLoading, data: topThree } = useQuery({
    queryKey: ['topthree'],
    queryFn: getTopThree,
  });

  return { isLoading, topThree };
}
