// TODO: Use a fake server to get the json as if it were an endpoint
import * as bgList from '../api/gameboard-list-scores.json';
import GameCard from './GameCard';

function BoardGameList() {
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
      </h1>
      <div className="grid h-4/6 grid-cols-4 overflow-auto px-2 py-2">
        {bgList['games'].map((game) => (
          <GameCard key={game.id_name} game={game} />
        ))}
      </div>
    </div>
  );
}

export default BoardGameList;
