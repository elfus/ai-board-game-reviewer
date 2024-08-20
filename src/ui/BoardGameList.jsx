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

  return (
    <div className="flex flex-col items-center justify-center">
      {(isLoadingCount || isLoadingPage) && <Loader />}
      <Title />
      <div className="flex w-10/12 flex-wrap items-center justify-center">
        {validPageId ? (
          currGames.map((game) => (
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
