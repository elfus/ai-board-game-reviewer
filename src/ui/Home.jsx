import { useTopThree } from '../features/boardgame/useBoardGameList';
import Button from './Button';
import GameCard from './GameCard';
import { Title } from './Title';

function Home() {
  const { isLoading, topThree } = useTopThree();
  return (
    <div className="my-4 px-4 text-center">
      <Title />
      <span className="mt-10 flex w-full justify-center text-8xl">👑</span>
      <div className="flex w-full justify-center py-10 font-sans text-4xl font-extrabold text-amber-300">
        <span className='bg-yellow-700 px-5 py-2 rounded-2xl bg-opacity-40 bg-blend-color-burn'>Top 3 Board Games</span>
      </div>
      <div className="mb-12 flex w-full items-center justify-center">
        <div className="flex flex-wrap items-center justify-center">
          {/* TODO: Add a nice LOADING SPINNER component */}
          {!isLoading &&
            topThree.map((game) => <GameCard key={game.id_name} game={game} />)}
        </div>
      </div>
      <Button type="primary" to="/list">
        Discover the full list
      </Button>
    </div>
  );
}

export default Home;
