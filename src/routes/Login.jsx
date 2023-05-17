import { useAuth0 } from "@auth0/auth0-react";

import React, { useEffect } from "react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

//  const handleLogin = async () => {
//    await loginWithRedirect({
//      appState: {
//        returnTo: "/profile",
//      },
//    });
//  };
useEffect(() => {
  // Call loginWithRedirect() here to trigger the login process
  loginWithRedirect();
}, []);

  return (
    <div>
    </div>
  )
};
export default Login;
  