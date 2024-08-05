import PropTypes from 'prop-types';

function GameCard({ game }) {
  return (
    <div
      key={game.name}
      className="w-82 relative m-4 h-56 rounded-xl bg-gray-200 px-2"
    >
      <img
        src={game.images.default}
        alt={game.name}
        className="absolute left-1/2 top-1/3 -my-2 -translate-x-1/2 -translate-y-1/3 rounded-xl px-2"
      />
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 transform text-center text-sm font-bold tracking-wider">
        {game.title}
      </span>
    </div>
  );
}

GameCard.propTypes = {
  game: PropTypes.object.isRequired,
};

export default GameCard;
