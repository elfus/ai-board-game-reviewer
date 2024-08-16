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

function BoardGameList() {
  const [currPage, setCurrPage] = useState(1);
  const [desc, toggleDescending] = useState(true);
  const { isLoadingCount, boardGameCount } = useBoardGameCount();
  const { isLoadingPage, boardGamePage } = useBoardGamePage(
    currPage,
    PAGE_SIZE,
  );

  function handleClick() {
    toggleDescending((d) => !d);
  }

  function handleNext() {
    setCurrPage((page) => page + 1);
  }

  function handlePrevious() {
    setCurrPage((page) => page - 1);
  }

  const currGames = useMemo(() => {
    if (!boardGamePage) return [];
    let games = boardGamePage;
    currPage;
    if (!desc) return games.reverse();
    return games;
  }, [boardGamePage, desc, currPage]);

  // TODO: Return a nice LOADING SPINNER component
  if (isLoadingPage || isLoadingCount) return null;

  const pageCount = Math.ceil(boardGameCount / PAGE_SIZE);

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
      <Title />
      <div className="flex w-10/12 flex-wrap items-center justify-center">
        {currGames.map((game) => (
          <GameCard key={game.id_name} game={game} className="" />
        ))}
      </div>
      <div className="grid w-1/6 grid-flow-col grid-rows-1 place-content-evenly py-4">
        <Button
          type="navigate"
          disabled={currPage === 1 ? true : false}
          onClick={handlePrevious}
        >
          Previous
        </Button>

        <div></div>

        <Button
          type="navigate"
          disabled={currPage === pageCount}
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
