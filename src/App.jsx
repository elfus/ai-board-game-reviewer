import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
import Home from './ui/Home';
import BoardGameList from './ui/BoardGameList';
import BoardGame from './ui/BoardGame';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home />, errorElement: <Error /> },
      { path: '/home', element: <Navigate to="/" replace /> },
      {
        path: '/list',
        element: <BoardGameList />,
        errorElement: <Error />,
      },
      {
        path: '/game/:gameId',
        element: <BoardGame />,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
