import { useQuery } from '@tanstack/react-query';

// import server api
// TODO: Add an intermediate layer named "GenericAPI" which
// takes care of deciding whether to use jsonserver, supabase or any other
// service
import { getBoardGameList } from '../../services/jsonServer/apiBoardGameList';

export function useBoardGameList() {
  const { isLoading, data: boardGameList } = useQuery({
    queryKey: ['boardgamelist'],
    queryFn: getBoardGameList,
  });

  return { isLoading, boardGameList };
}
