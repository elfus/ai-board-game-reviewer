import { useParams } from 'react-router-dom';
// TODO: Usage of this json file should be replaced by a
// making requests, but in the mean time, use the json itself
import * as bgList from '../api/gameboard-list-scores.json';
import GameCard from './GameCard';

function BoardGame() {
  const params = useParams();
  const gameId = Number(params.gameId);
  bgList;
  // Do some manual filtering on the json data structure
  // Once we make endpoint requests this filtering can be
  // done by the server
  const [game] = bgList['games'].filter((currGame) => currGame.id === gameId);
  console.log(`Game found`, game);

  return (
    <>
      <div className="w-1/2 translate-x-1/2">
        <GameCard game={game} type={'big'} />
      </div>
    </>
  );
}

export default BoardGame;
