import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Auth/Login';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Signup from '../pages/Auth/Signup';
import Home from '../pages/Home/Home';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: <Login />,
        errorElement: <h1>404</h1>,
      },
      {
        path: '/signup',
        element: <Signup />,
        errorElement: <h1>404</h1>,
      },
    ],
  },
]);

export default router;
