import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      This is the home page
      <p>Here we should display information on what our app does.</p>
      <p>Include a search field to start searching for a game</p>
      <p>Or click on the button below to go to our board game list</p>
      <button onClick={() => navigate("/list")}>Board Game List</button>
    </div>
  );
}

export default Home;
