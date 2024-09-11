import { useQueryClient, useQuery } from '@tanstack/react-query';

// import server api
// TODO: Add an intermediate layer named "GenericAPI" which
// takes care of deciding whether to use jsonserver, supabase or any other
// service
import {
  getTopThree,
  getBoardGamesPage,
  getBoardGamesCount,
} from '../../services/supabase/apiBoardGameList';

export function useBoardGamePage(page, pageSize) {
  const { isLoadingCount, boardGameCount } = useBoardGameCount();
  const { isLoading: isLoadingPage, data: boardGamePage } = useQuery({
    queryKey: ['boardgamepage', page, pageSize],
    queryFn: () => getBoardGamesPage({ page, pageSize }),
  });
  const queryClient = useQueryClient();

  if (isLoadingCount || !page || !pageSize)
    return { isLoadingPage: true, boardGameCount: 0 };

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

  return { isLoadingPage, boardGamePage };
}

export function useBoardGameCount() {
  const { isLoading: isLoadingCount, data: boardGameCount } = useQuery({
    queryKey: ['boardgamecount'],
    queryFn: () => getBoardGamesCount(),
  });
  return { isLoadingCount, boardGameCount };
}

export function useTopThree() {
  const { isLoading, data: topThree } = useQuery({
    queryKey: ['topthree'],
    queryFn: getTopThree,
  });

  return { isLoading, topThree };
}
