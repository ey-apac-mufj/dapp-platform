import { createContext, useState } from "react";
import { apiurl } from "../../const/yourDetails";

export const LoginContext = createContext({
  loggedInStatus: false,
});

const userLoggedin = async () => {
  try {
    let getUser = await fetch(`${apiurl}/api/get_user`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    });
    let getUserRes = await getUser.json();
    if (getUserRes.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const LoginProvider = ({ children }) => {
  const [loggedInStatus, setLoggedInStatus] = useState(userLoggedin());

  const value = { loggedInStatus, setLoggedInStatus };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
