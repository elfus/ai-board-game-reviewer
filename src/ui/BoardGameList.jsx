import { useMemo } from 'react';
import { useGameboardList } from '../stores/use-gameboard-list';
import GameCard from './GameCard';
import Button from './Button';
import SearchBoardGame from '../features/boardgame/SearchBoardGame';

function BoardGameList() {
  const { ranked, desc, toggleDescending } = useGameboardList();

  function handleClick() {
    toggleDescending()
  }

  const currGames = useMemo(() => {
    let games = ranked.slice();
    if (!desc) return games.reverse();
    return games;
  }, [ranked, desc]);

  return (
    <div className="auto h-screen w-screen overflow-auto border-b-2 px-96 py-4">
      <span className="flex justify-between">
        <SearchBoardGame />
        <Button type="secondary" onClick={handleClick}>
          Score {desc ? 'Sorted descending' : 'Sorted ascending'}
        </Button>
      </span>

      <div className="mt-28 grid h-4/6 grid-cols-4 overflow-auto px-2 py-2">
        {currGames.map((game) => (
          <GameCard key={game.id_name} game={game} />
        ))}
      </div>
    </div>
  );
}

export default BoardGameList;
