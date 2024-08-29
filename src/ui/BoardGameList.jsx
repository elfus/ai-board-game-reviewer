import GameCard from './GameCard';
import Button from './Button';
import SearchBoardGame from '../features/boardgame/SearchBoardGame';
import PAGE_SIZE from '../utils/contants';
import { Title } from './Title';
import {
  useBoardGameCount,
  useBoardGamePage,
} from '../features/boardgame/useBoardGameList';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from './Loader';
import Filter from './Filter';

function filterAndSort(allGames, filter, sortBy) {
  filter = filter ?? 'airank';
  const isAscending = sortBy?.split('-')[1] === 'asc' ? true : false;

  let sortedGames = [...allGames];
  switch (filter) {
    case 'airank':
      sortedGames.sort((a, b) => {
        if (isAscending) return a.rank - b.rank;
        else return b.rank - a.rank;
      });
      break;
    case 'playercount':
      sortedGames.sort((a, b) => {
        if (isAscending) return a.players.max - b.players.max;
        else return b.players.max - a.players.max;
      });
      break;
    case 'price':
      sortedGames.sort((a, b) => {
        if (isAscending) return a.price - b.price;
        else return b.price - a.price;
      });
      break;
    case 'duration':
      sortedGames.sort((a, b) => {
        if (isAscending) return a.score.duration - b.score.duration;
        else return b.score.duration - a.score.duration;
      });
      break;
    case 'votes':
      sortedGames.sort((a, b) => {
        if (isAscending) return a.votes - b.votes;
        else return b.votes - a.votes;
      });
      break;
  }
  return sortedGames;
}

function BoardGameList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const pageId = page ? parseInt(page, 10) : 1;
  const [desc, toggleDescending] = useState(true);
  const { isLoadingCount, boardGameCount } = useBoardGameCount();
  const { isLoadingPage, boardGamePage } = useBoardGamePage(pageId, PAGE_SIZE);

  function handleClick() {
    toggleDescending((d) => !d);
  }

  function handleNext() {
    searchParams.set('page', pageId + 1);
    setSearchParams(searchParams);
  }

  function handlePrevious() {
    searchParams.set('page', pageId - 1);
    setSearchParams(searchParams);
  }

  const currGames = useMemo(() => {
    if (!boardGamePage) return [];
    let games = boardGamePage;
    if (!desc) return games.reverse();
    return games;
  }, [boardGamePage, desc]);

  const pageCount = Math.ceil(boardGameCount / PAGE_SIZE);
  const validPageId = pageId > 0 && pageId <= pageCount;

  // TODO: Wire up the search feature
  const filters = (
    <span className="flex items-center justify-between">
      <SearchBoardGame />
      <Button type="secondary" onClick={handleClick}>
        Score {desc ? 'Sorted descending' : 'Sorted ascending'}
      </Button>
    </span>
  );
  filters;

  const gamesFiltered = filterAndSort(
    currGames,
    searchParams.get('filter'),
    searchParams.get('sortBy'),
  );

  return (
    <div className="flex flex-col items-center justify-center">
      {(isLoadingCount || isLoadingPage) && <Loader />}
      <Title />
      <Filter
        filterField={'filter'}
        options={[
          { value: 'airank', label: 'AI Rank' },
          { value: 'playercount', label: 'Number of players' },
          { value: 'price', label: 'Price' },
          { value: 'duration', label: 'Duration' },
          { value: 'votes', label: 'Votes' },
        ]}
      />
      <div className="flex w-10/12 flex-wrap items-center justify-center">
        {validPageId ? (
          gamesFiltered.map((game) => (
            <GameCard key={game.id_name} game={game} className="" />
          ))
        ) : (
          <div className="flex flex-col items-center space-y-2 py-2">
            <span className="text-2xl font-bold text-red-600">
              Page {pageId} not found
            </span>
            <span className="text-xl font-semibold text-yellow-400">
              There are {pageCount} pages in the board game list
            </span>
          </div>
        )}
      </div>
      <div className="grid w-1/6 grid-flow-col grid-rows-1 place-content-evenly py-4">
        <Button
          type="navigate"
          disabled={pageId === 1 || !validPageId ? true : false}
          onClick={handlePrevious}
        >
          Previous
        </Button>

        <div></div>

        <Button
          type="navigate"
          disabled={pageId === pageCount || !validPageId}
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
      <div>
        <Button type="primary" to="/">
          Go back to the top 3
        </Button>
      </div>
    </div>
  );
}

export default BoardGameList;
