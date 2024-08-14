import GameCard from './GameCard';
import Button from './Button';
import SearchBoardGame from '../features/boardgame/SearchBoardGame';
import PAGE_SIZE from '../utils/contants';
import { Title } from './Title';
import { useBoardGameRanked } from '../features/boardgame/useBoardGameList';
import { useMemo, useState } from 'react';

function BoardGameList() {
  const [ currPage, setCurrPage ] = useState(Number(0));
  const [ desc, toggleDescending ] = useState(true);
  const { isLoading, boardGameRanked } = useBoardGameRanked();
  
  const startIdx = PAGE_SIZE*currPage;
  const endIdx   = startIdx + PAGE_SIZE;
  
  function handleClick() {
    toggleDescending((d) => !d);
  }
  
  function handleNext() {
    setCurrPage((page)=> page+1)
  }

  function handlePrevious() {
    setCurrPage((page)=> page-1)
  }
  setCurrPage;

  const currGames = useMemo(() => {
    if (!boardGameRanked) return [];
    let games = boardGameRanked.slice(startIdx, endIdx);
    if (!desc) return games.reverse();
    return games;
  }, [boardGameRanked, desc, currPage]);

  // TODO: Return a nice LOADING SPINNER component
  if (isLoading) return null;

  const pageCount = Math.ceil(boardGameRanked.length/PAGE_SIZE)-1

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
      <div className="flex p-2 space-x-4">
          <Button type="secondary" disabled={currPage<1?true:false} onClick={handlePrevious} >
            Previous
          </Button>
          
          <Button type="secondary" disabled={currPage>=pageCount} onClick={handleNext} >
            Next
          </Button>
        </div>
        <div >
          <Button type="primary" to="/">
            Go back to the top 3
          </Button>
        </div>
    </div>
  );
}

export default BoardGameList;
