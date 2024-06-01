import { Outlet } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { UserProvider } from './Context/useAuth';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <UserProvider>
        <Outlet />
        <ToastContainer />
      </UserProvider>
    </>
  );
};

export default App;
