import { Navigate } from "react-router-dom";
import { Layout} from "../Components";
import { InitPage, LoginPage, Notificaciones, RedSocialPage, UserForm } from "../pages";

const PrivateRoutes = () =>{
    return{
        element: <Layout/>,
        children: [
            
            {
                path: "/",
                element: <InitPage/>
            },
            {
                path: "/login",
                element: <LoginPage/>
            },
            {
                path: "/redsocial",
                element: <RedSocialPage />
            },
           
            {
                path: "*",
                element: <Navigate to={'/'} replace/>
            },
            {
                path: "/register",
                element: <UserForm/>

            },
            {
                path: "/notificaciones",
                element: <Notificaciones/>
            }

        ]
    };
}

export default PrivateRoutes;