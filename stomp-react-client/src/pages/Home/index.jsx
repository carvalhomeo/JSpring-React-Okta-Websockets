import { useOktaAuth } from "@okta/okta-react";
import React, { useState, useEffect } from "react";
import AnotherComponent from "../../components/AnotherComponent";

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const login = async () => {
    await oktaAuth.signInWithRedirect();
  };

  if (!authState) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        {authState.isAuthenticated && !userInfo && (
          <div>Loading user information...</div>
        )}

        {authState.isAuthenticated && userInfo && (
          <AnotherComponent user={userInfo} />
        )}

        {!authState.isAuthenticated && (
          <div>
            <button id="login-button" onClick={login}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
