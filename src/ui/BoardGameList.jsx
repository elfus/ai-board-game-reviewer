import { useMemo } from 'react';
import { useGameboardList } from '../stores/use-gameboard-list';
import GameCard from './GameCard';
import Button from './Button';
import SearchBoardGame from '../features/boardgame/SearchBoardGame';
import { Title } from './Title';
import { useBoardGameList } from '../features/boardgame/useBoardGameList';

function BoardGameList() {
  const { ranked, desc, toggleDescending } = useGameboardList();
  const { isLoading, boardGameList } = useBoardGameList();

  function handleClick() {
    toggleDescending();
  }

  const currGames = useMemo(() => {
    let games = ranked.slice();
    if (!desc) return games.reverse();
    return games;
  }, [ranked, desc]);

  if (isLoading) return null;
  console.log(boardGameList);

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
      <div className="flex max-h-screen w-10/12 flex-wrap items-center justify-center overflow-y-scroll pb-96">
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
