import GameCard from './GameCard';
import Button from './Button';
import SearchBoardGame from '../features/boardgame/SearchBoardGame';
import { Title } from './Title';
import { useBoardGameRanked } from '../features/boardgame/useBoardGameList';
import { useMemo, useState } from 'react';

function BoardGameList() {
  const { desc, toggleDescending } = useState(true);
  const { isLoading, boardGameRanked } = useBoardGameRanked();

  function handleClick() {
    toggleDescending((d) => !d);
  }

  const currGames = useMemo(() => {
    if (!boardGameRanked) return [];
    let games = boardGameRanked.slice();
    if (!desc) return games.reverse();
    return games;
  }, [boardGameRanked, desc]);

  // TODO: Return a nice LOADING SPINNER component
  if (isLoading) return null;

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
        <div className="p-10">
          <Button type="primary" to="/">
            Go back to the top 3
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BoardGameList;
