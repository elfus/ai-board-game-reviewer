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

  function getEmoji(score) {
    if (score < 3) return '🔴';
    if (score < 5) return '🟠';
    if (score < 8) return '🟡';
    return '🟢';
  }

  return (
    <div
      key={game.name}
      className={`${className} group hover:cursor-default flex flex-col bg-black text-white font-bold justify-between items-center w-72 h-40 m-2 relative rounded-2xl overflow-hidden ${overEffect}`}
      onClick={() => handleClick(game.id)}
    >
      <img
        src={game.images.banner}
        alt={game.name}
        className="group-hover:visible absolute opacity-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
      />
      <img
        src={game.images.default}
        alt={game.name}
        className="group-hover:hidden absolute opacity-60 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
      />
      <div className="group-hover:hidden z-10 w-full flex justify-between items-start">
        <span className='p-2 underline'>{game.rank}</span>
        <span className='p-2'>{game.overall.toFixed(1)}</span>
      </div>
      <div className="hidden group-hover:grid z-10 w-full grid-cols-4 justify-even p-1 items-start text-left text-sm">
        <span className='p-2 underline'>Overview</span>
        <span className='p-2'>{getEmoji(game.overall)} {game.overall.toFixed(1)}</span>
        <span className='p-2 underline'>BGG Score</span>
        <span className='p-2'>{getEmoji(game.rating)} {game.rating.toFixed(1)}</span>
        <span className='p-2 underline'>Fun</span>
        <span className='p-2'>{getEmoji(game.score.fun)} {game.score.fun.toFixed(1)}</span>
        <span className='p-2 underline'>Difficulty</span>
        <span className='p-2'>{getEmoji(game.score.difficulty)} {game.score.difficulty.toFixed(1)}</span>
        <span className='p-2 underline'>Cost</span>
        <span className='p-2'>{getEmoji(game.score.cost)} {game.score.cost.toFixed(1)}</span>
        <span className='p-2 underline'>Duration</span>
        <span className='p-2'>{getEmoji(game.score.duration)} {game.score.duration.toFixed(1)}</span>
        <span className='p-2 underline'>Players</span>
        <span className='p-2'>{getEmoji(game.score.players)} {game.score.players.toFixed(1)}</span>
        <span className='p-2 underline'>Learning Curve</span>
        <span className='p-2'>{getEmoji(game.score.learning_curve)} {game.score.learning_curve.toFixed(1)}</span>
      </div>
      <span className="group-hover:hidden z-10 font-mono text-center">
        {game.title}
      </span>
      <span className="group-hover:hidden z-10 text-sm">
        {game.votes.toLocaleString()} votes
      </span>
      <div className="group-hover:hidden z-10 w-full flex justify-between items-start">
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
