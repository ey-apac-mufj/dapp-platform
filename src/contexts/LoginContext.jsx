import { createContext, useState } from "react";
import { apiurl } from "../../const/yourDetails";

export const LoginContext = createContext({
  loggedInStatus: false,
});

const userLoggedin = async () => {
  // Todo: Use login context to manage state
  try {
    return {
      loggedInStatus: true,
      userDetails: {},
    };
  } catch (error) {
    return false;
  }
};

export const LoginProvider = ({ children }) => {
  const [loggedInStatus, setLoggedInStatus] = useState(
    userLoggedin().loggedInStatus
  );
  const [userData, setUserData] = useState(userLoggedin().userDetails);

  const value = { loggedInStatus, setLoggedInStatus, userData, setUserData };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
