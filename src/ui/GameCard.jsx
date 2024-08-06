import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { sumScore } from '../stores/use-gameboard-list';

function GameCard({ className, game }) {
  const navigate = useNavigate();
  const insideList = window.location.href.split('/').at(-1) === 'list';

  function handleClick(gameId) {
    if (!insideList) return;
    navigate(`/game/${gameId}`);
  }

  const overEffect = insideList
    ? 'transition-colors transition-opacity duration-300 hover:bg-stone-200 hover:opacity-70'
    : '';

  return (
    <div
      key={game.name}
      className={`${className} w-82 relative m-4 h-56 rounded-xl bg-stone-300 px-2 ${overEffect}`}
      onClick={() => handleClick(game.id)}
    >
      <img
        src={game.images.default}
        alt={game.name}
        className="absolute left-1/2 top-1/3 -my-2 -translate-x-1/2 -translate-y-1/3 rounded-xl px-2"
      />
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 transform text-center text-sm font-bold tracking-wider">
        {game.title} ({sumScore(game.score)})
      </span>
    </div>
  );
}

GameCard.propTypes = {
  game: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default GameCard;
