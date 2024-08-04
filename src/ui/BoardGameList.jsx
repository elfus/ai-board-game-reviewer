import { useNavigate } from "react-router-dom";

function BoardGameList() {
  const navigate = useNavigate();
  return (
    <div>
      This is the Board Game list
      <p>We should display all board games we have scrapped in this screen</p>
      <p>When the user clicks on a game we should redirect to /game/10;</p>
      <button onClick={() => navigate("/game/10")}>Go to game 10</button>
    </div>
  );
}

export default BoardGameList;
