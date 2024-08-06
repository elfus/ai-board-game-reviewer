import { useGameboardList } from '../stores/use-gameboard-list';
import Button from './Button';
import GameCard from './GameCard';

function Home() {
  const { top } = useGameboardList();

  return (
    <div className="my-10 px-4 text-center">
      <h1 className="my-10 px-4 text-xl font-semibold md:text-4xl text-white">
        The AI Game Board Reviewer
        <br />
        <span className="text-xl text-teal-400">
          <p className="my-2 italic">
            Ratings based on the people&apos;s comments found on the internet.
          </p>
        </span>
      </h1>
      <span className="flex justify-center w-full text-xl text-amber-300 font-extrabold font-sans">Top 3 Games</span>
      <div className="flex justify-center w-full px-2 py-2 items-center">
        {top.map((game) => (
          <GameCard className="w-full" key={game.id_name} game={game} />
        ))}
      </div>

      <Button type="primary" to="/list">
        See full list
      </Button>
    </div>
  );
}

export default Home;
