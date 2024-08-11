import { useRoutes } from "react-router-dom"
import Login from "../Login/Login"
import Task from "../Pages/task/Task"

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