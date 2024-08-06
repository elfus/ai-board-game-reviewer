import { useMemo } from 'react';
import { useGameboardList } from '../stores/use-gameboard-list';
import GameCard from './GameCard';
import Button from './Button';
import SearchBoardGame from '../features/boardgame/SearchBoardGame';
import { Title } from './Title';

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

  // TODO: Wire up the search feature
  const filters = (<span className="flex justify-between items-center">
    <SearchBoardGame />
    <Button type="secondary" onClick={handleClick}>
      Score {desc ? 'Sorted descending' : 'Sorted ascending'}
    </Button>
  </span>)
  filters;

  return (
    <div className="flex flex-col items-center justify-center">
      <Title />
      <div className="w-10/12 flex flex-wrap items-center justify-center overflow-y-scroll max-h-screen pb-96">
        {currGames.map((game) => (
          <GameCard key={game.id_name} game={game} className="" />
        ))}
        <div className='p-10'>
          <Button type="primary" to="/">
            Go back to the top 3
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BoardGameList;
