import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useState } from "react";

const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return{
        logged: !!user,
        user: user 
    }
}

export const AuthProvider = ({ children }) => {
    const userPre = init();
    const [logged, setLogged] = useState(userPre.logged);
    const [user, setUser] = useState(userPre.user);
    const navigate = useNavigate();
  
    const login = (user) => {
      localStorage.setItem('user', JSON.stringify(user));
      setLogged(true);
      setUser(user);
      navigate('/');
    }
  
    const logout = () => {
      localStorage.removeItem('user');
      setLogged(false);
      setUser(null);
      navigate('/init');
    }
  
    return (
      <AuthContext.Provider value={{ logged, user, login, logout }}>
        {children}
      </AuthContext.Provider>
    )
  }