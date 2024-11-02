import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AuthContext = createContext();

function AuthProvider(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(false);
  const [token, setToken] = useState(false);

  let logoutHandler = async () => {
    if (window.confirm(`Are you sure to logout?`)) {
      await axios
        .get(`/api/auth/logout`)
        .then((res) => {
          toast.success(res.data.msg);
          setIsLogin(false);
          setToken(false);
          window.location.reload();
        })
        .catch((err) => toast.error(err.response.data.msg));
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLogin, setIsLogin, user, setUser, logoutHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
