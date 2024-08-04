import { useParams } from "react-router-dom";

function BoardGame() {
  const params = useParams();
  const { gameId } = params;

  return (
    <div>
      Board game id {gameId}
      <p>Display information about a specific board game</p>
    </div>
  );
}

export default BoardGame;
