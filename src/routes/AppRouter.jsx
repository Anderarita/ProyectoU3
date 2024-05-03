import { Route, Routes } from "react-router-dom"
import { HistorialPage, InitPage, LoginPage, RedSocialPage, UserForm, UserProfile, } from "../pages"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"
import ListUser from "../pages/ListUser"



export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/redSocial" element={<PrivateRoute><RedSocialPage /></PrivateRoute>} />
        <Route path="/login" element={<PublicRoute>e<LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><UserForm /></PublicRoute>} />
        <Route path="/" element={<PublicRoute><InitPage /></PublicRoute>} />
        <Route path="/List" element={<PrivateRoute><ListUser/></PrivateRoute>}/>
        <Route path="/Perfil" element={<PrivateRoute><UserProfile/></PrivateRoute>}/>
        <Route path="/historial" element={<PrivateRoute><HistorialPage/></PrivateRoute>}/>
    </Routes>
  )
}
