import { useGameboardList } from '../stores/use-gameboard-list';
import Button from './Button';
import GameCard from './GameCard';
import { Title } from './Title';

function Home() {
  const { top } = useGameboardList();

  return (
    <div className="my-10 px-4 text-center h-screen overflow-y-auto pb-60">
      <Title />
      <span className="flex justify-center w-full text-8xl mt-10">
        👑
      </span>
      <span className="flex justify-center w-full underline text-3xl text-amber-300 font-extrabold font-sans py-10">
        Top 3 Board Games
      </span>
      <span className="flex justify-center w-full text-5xl mb-10">
      🥇 &nbsp; 🥈  &nbsp; 🥉
      </span>
      <div className="flex justify-center items-center w-full mb-12">
        <div className='flex flex-wrap justify-center items-center'>
          {top.map((game) => (
            <GameCard key={game.id_name} game={game} />
          ))}
        </div>
      </div>
      <Button type="primary" to="/list">
        Discover the full list
      </Button>
    </div>
  );
}

export default Home;
