import { useQuery } from '@tanstack/react-query';
import { getLastUpdated } from '../services/supabase/apiBoardGameList';

function parseIsoString(isoString) {
  // Create a new Date object directly from the ISO string
  const date = new Date(isoString);

  // Optionally, verify if the date object is valid
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  return date;
}

export function useLastUpdated() {
  const { isLoading, data: isoString } = useQuery({
    queryKey: ['lastupdated'],
    queryFn: getLastUpdated,
  });
  if(isLoading) return {isLoading, lastUpdatedDate:''}
  const lastUpdatedDate = parseIsoString(isoString);
  return { isLoading, lastUpdatedDate };
}
