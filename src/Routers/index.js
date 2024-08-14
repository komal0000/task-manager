import { useRoutes, Navigate } from "react-router-dom";
import Task from "../Pages/task/Task";
import Login from "../Pages/Login/Login";
import { useAuth } from "../Context/AuthContext";

const Routers = () => {
  const {user} = useAuth();
  const routes = [
    {
      path: '/',
      element: user ? <Navigate to="/task" /> : <Login />,
    },
    {
      path: 'login',
      element: user ? <Navigate to="/task" /> : <Login />,
    },
    {
      path: 'task',
      element: user ? <Task /> : <Navigate to="/login" />,
    }
  ];

  const routing = useRoutes(routes);

  return routing;
};

export default Routers;
