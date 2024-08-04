import SearchBoardGame from '../features/boardgame/SearchBoardGame';
import Button from './Button';

function Home() {
  return (
    <div className="my-10 px-4 text-center">
      <h1 className="my-10 px-4 text-xl font-semibold md:text-4xl">
        The AI Board Game Reviewer
        <br />
        <span className="text-xl text-amber-600">
          <p className="my-2 italic">
            Ratings based on the people&apos;s comments found on the internet.
          </p>
        </span>
      </h1>

      <div className="my-10">
        <SearchBoardGame />
      </div>

      <Button type="primary" to="/list">
        See full list
      </Button>
    </div>
  );
}

export default Home;
