import { createBrowserRouter } from "react-router-dom";
import PrivateRuotes from "./PrivateRuotes";

const Router = () =>{
    return createBrowserRouter([
        PrivateRuotes()
    ])
}

export default Router;