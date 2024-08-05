import { useEffect, useState } from 'react';
import { useGameboardList } from '../stores/use-gameboard-list';
import GameCard from './GameCard';
import Button from './Button';

function BoardGameList() {
  const { rankedDesc, getRankedDescending } = useGameboardList();
  const [desc, setDescending] = useState(true);

  useEffect(() => {
    getRankedDescending();
  }, [getRankedDescending]);

  function handleClick() {
    setDescending((d) => !d);
  }

  let currGames = rankedDesc.slice();
  if (!desc) {
    currGames = [];
    for (let i = rankedDesc.length - 1; i >= 0; i--)
      currGames.push(rankedDesc[i]);
  }
  return (
    <div className="auto h-screen w-screen overflow-auto border-b-2 px-96 py-4">
      <h1 className="px-4 text-center text-xl font-semibold md:text-4xl">
        Board Game List
        <br />
        <span className="text-xl text-amber-600">
          <p className="my-2 italic">
            Ratings based on the people&apos;s comments found on the internet.
          </p>
        </span>
        <span className="absolute left-1/2 -translate-x-1/2">
          <Button type="secondary" onClick={handleClick}>
            Score {desc ? 'Sorted descending' : 'Sorted ascending'}
          </Button>
        </span>
      </h1>

      <div className="mt-28 grid h-4/6 grid-cols-4 overflow-auto px-2 py-2">
        {currGames.map((game) => (
          <GameCard key={game.id_name} game={game} />
        ))}
      </div>
    </div>
  );
}

export default BoardGameList;
