import { useRoutes, Navigate } from "react-router-dom";
import Task from "../Pages/task/Task";
import Login from "../Pages/Login/Login";
import { useAuth } from "../Context/AuthContext";
import ResetPassword from "../Pages/task/Components/ResetPassword";

const Routers = () => {
  const {user} = useAuth();
  const routes = [
    
    {
      path: 'login',
      element: user ? <Navigate to="/" /> : <Login />,
    },
    {
      path: '/',
      element: user ? <Task /> : <Navigate to="/login" />,
    },
    {
      path: '/reset',
      element: user ? <ResetPassword /> : <Navigate to="/login" />,
    }
  ];

  const routing = useRoutes(routes);

  return routing;
};

export default Routers;
