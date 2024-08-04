import PropTypes from 'prop-types';

function GameCard({ game }) {
  return (
    <div
      key={game.name}
      className="relative m-4 h-48 rounded-3xl bg-gray-200 px-2"
    >
      <img
        src={game.images.default}
        alt={game.name}
        className="absolute left-1/2 top-1/3 h-32 h-screen -translate-x-1/2 -translate-y-1/3 rounded-xl p-2 opacity-70"
      />
      <span className="absolute left-1/2 top-3/4 -translate-x-1/2 transform text-center text-4xl font-bold">
        {game.name}
      </span>
    </div>
  );
}

GameCard.propTypes = {
  game: PropTypes.object.isRequired,
};

export default GameCard;
