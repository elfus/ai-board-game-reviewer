import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function GameCard({ className, game }) {
  const navigate = useNavigate();
  const split = window.location.href.split('/');
  const isHover = split.at(-1) === 'list' && false;

  function handleClick(gameId) {
    if (!isHover) return;
    navigate(`/game/${gameId}`);
  }

  const overEffect = isHover
    ? 'cursor-pointer transition-colors transition-opacity duration-300 hover:bg-stone-200 hover:opacity-70'
    : '';

  return (
    <div
      key={game.name}
      className={`${className} flex flex-col bg-black text-white font-bold justify-between items-center w-72 h-40 m-2 relative rounded-2xl overflow-hidden ${overEffect}`}
      onClick={() => handleClick(game.id)}
    >
      <img
        src={game.images.default}
        alt={game.name}
        className="absolute opacity-60 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
      />
      <div className="z-10 w-full flex justify-between items-start">
        <span className='p-2 underline'>{game.rank}</span>
        <span className='p-2'>{game.overall.toFixed(1)}</span>
      </div>
      <span className="z-10 font-mono text-center">
        {game.title}
      </span>
      <span className="z-10 text-sm">
        {game.votes.toLocaleString()} votes
      </span>
      <div className="z-10 w-full flex justify-between items-start">
        <span className='p-2'>{game.players.min} - {game.players.max} P</span>
        <span className='p-2'>${game.price}</span>
      </div>
    </div>
  );
}

GameCard.propTypes = {
  game: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default GameCard;
