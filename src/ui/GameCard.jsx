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
      className={`${className} group relative m-2 flex h-40 w-72 flex-col items-center justify-between overflow-hidden rounded-2xl bg-black font-bold text-white hover:cursor-default ${overEffect}`}
      onClick={() => handleClick(game.id)}
    >
      <img
        src={game.images_banner}
        alt={game.name}
        className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 opacity-40 group-hover:visible"
      />
      <img
        src={game.images_default}
        alt={game.name}
        className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 opacity-60 group-hover:hidden"
      />
      <div className="z-10 flex w-full items-start justify-between group-hover:hidden">
        <span className="p-2 underline">{game.rank}</span>
        <span className="text-5xl">
          {['🥇', '🥈', '🥉'][game.score.rank - 1] ?? ''}
        </span>
        <span className="p-2">{Number(game.score.overall).toFixed(1)}</span>
      </div>
      <div className="justify-even z-10 hidden w-full grid-cols-4 items-start p-1 text-left text-xs group-hover:grid">
        <span className="p-2 underline">Overview</span>
        <span className="p-2">
          {getEmoji(game.score.overall)} {Number(game.score.overall).toFixed(1)}
        </span>
        <span className="p-2 text-cyan-400 underline hover:text-cyan-500">
          <a
            href={`https://boardgamegeek.com/boardgame/${game.objectId}/${game.id_name}/ratings?pageid=1&rated=1&comment=1`}
            target="_blank"
          >
            BGG Score
          </a>
        </span>
        <span className="p-2">
          {getEmoji(game.rating)} {game.rating.toFixed(1)}
        </span>
        <span className="p-2 underline">Fun</span>
        <span className="p-2">
          {getEmoji(game.score.fun)} {Number(game.score.fun).toFixed(1)}
        </span>
        <span className="p-2 underline">Difficulty</span>
        <span className="p-2">
          {getEmoji(game.score.difficulty)}{' '}
          {Number(game.score.difficulty).toFixed(1)}
        </span>
        <span className="p-2 underline">Cost</span>
        <span className="p-2">
          {getEmoji(game.score.cost)} {Number(game.score.cost).toFixed(1)}
        </span>
        <span className="p-2 underline">Duration</span>
        <span className="p-2">
          {getEmoji(game.duration_max)} {Number(game.duration_max)} m
        </span>
        <span className="p-2 underline">Players</span>
        <span className="p-2">
          {getEmoji(game.score.players)} {Number(game.score.players).toFixed(1)}
        </span>
        <span className="p-2 underline">Learning Curve</span>
        <span className="p-2">
          {getEmoji(game.score.learning_curve)}{' '}
          {Number(game.score.learning_curve).toFixed(1)}
        </span>
      </div>
      <span className="z-10 text-center font-mono group-hover:hidden">
        {game.title}
      </span>
      <span className="z-10 text-sm group-hover:hidden">
        {game.votes.toLocaleString()} votes
      </span>
      <div className="z-10 flex w-full items-start justify-between group-hover:hidden">
        <span className="p-2">
          {game.players_min} - {game.players_max} P
        </span>
        <span className="p-2">${game.price}</span>
      </div>
    </div>
  );
}

GameCard.propTypes = {
  game: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default GameCard;
