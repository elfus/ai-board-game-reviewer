import Button from './Button';

function Home() {
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

      <Button type="primary" to="/list">
        See full list
      </Button>
    </div>
  );
}

export default Home;
