import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import ConnectWalletButton from "../components/ConnectWalletButton";
import { useAddress } from "@thirdweb-dev/react";
import { LoginContext } from "../contexts/LoginContext";
import Login from "../apiCall/Login";
import ProfileDetails from "../components/ProfileDetails";

export default function Profile() {
  const address = useAddress();
  const [user, setUser] = useState(null);

  const { loggedInStatus } = useContext(LoginContext);

  const getUser = async () => {
    const res = await Login.getUser();
    if (res.status === 200) {
      setUser(res.data);
    } else {
      setUser(null);
    }
  };
  useEffect(() => {
    getUser();
  }, [loggedInStatus]);

  return (
    <>
      <Navbar activeMenu="Profile" />
      <div className="container text-center mx-auto px-5 md:px-40 py-5 justify-center">
        <h5 className="font-medium text-2xl">My Profile</h5>
        <div className="mx-auto mt-4">
          <ConnectWalletButton customClass="connectWalletButton" />
        </div>
        <hr className="h-1 bg-gray-500" />
        {address && loggedInStatus ? (
          <ProfileDetails userDetails={user} />
        ) : (
          <div className="bg-red-300 w-full p-5 m-5 text-center text-xl">
            You are not authorized to view this page! Please login to continue!
          </div>
        )}
      </div>
    </>
  );
}
