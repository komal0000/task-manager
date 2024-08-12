import { useRoutes } from "react-router-dom"
import Task from "../Pages/task/Task"
import Login from "../Pages/Login/Login"

const Routers = () =>{
   return useRoutes ([
    {
        path :'/',
        element:<Login/>
    },
    {
        path : 'login',
        element : <Login/>
           
    },
    {
        path : 'task',
        element : <Task/>
    }
   ])
}

export default Routers