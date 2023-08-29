import React, { useState, useEffect, useContext } from "react";
import Login from "../apiCall/Login";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../contexts/LoginContext";
import { Link } from "react-router-dom";
import { userTypes } from "../../const/yourDetails";

export default function Navbar({ activeMenu }) {
  const sdk = useSDK(); // Get SDK
  const [navbar, setNavbar] = useState(false);
  const [user, setUser] = useState(null);
  const [signature, setSignature] = useState(null);

  const { loggedInStatus, setLoggedInStatus } = useContext(LoginContext);

  const address = useAddress();

  const getUser = async () => {
    const res = await Login.getUser();
    if (res.status === 200) {
      setUser(res.data);
      // console.log("this is the datra", res.data);
      setLoggedInStatus(true);
    } else {
      setUser(null);
      setLoggedInStatus(false);
    }
  };

  const handleMediLogout = async () => {
    let logout = await fetch("https://medi-lx.xyz/api/logout", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    });
    let logoutRes = await logout.json();
    setSignature(null);
    console.log("--------------------------------------");
    console.log(logoutRes);
    getUser();
  };

  const handleMediConnect = async () => {
    const message =
      "Please confirm to connect to Medi API Services at " + Date.now(); // Message to show at the time of signing

    try {
      const signature = await sdk.wallet.sign(message); // Signing message using wallet
      console.log(signature);
      if (signature && signature != undefined) {
        setSignature(signature);

        try {
          let login = await Login.login(address, message, signature);
          if (login?.status === 200 || login?.status === 201) {
            setLoggedInStatus(true);
          } else if (login?.status === 404) {
            window.location.href = `https://medi-lx.xyz/site/register?address=${address}`;
          } else {
            // Show error message
            console.log(login);
            toast.error(login?.message, {
              position: "bottom-right",
              autoClose: 3000,
            });
          }
        } catch (error) {
          toast.error(
            "Could not complete the sign in process! please try again!",
            {
              position: "bottom-right",
              autoClose: 3000,
            }
          );
        }
      } else {
        toast.error("Could not sign! Please try again!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Could not sign! Please try again!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (loggedInStatus) getUser();
  }, [loggedInStatus]);

  return (
    <nav className="w-full bg-gray-200 shadow">
      <div className="px-5 md:items-center md:flex md:justify-between">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to="/community-details" className="cursor-pointer">
              <h5 className="font-bold text-purple-500 text-xl">
                Web3 Community
              </h5>
            </Link>

            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-2 mx-right">
          <div
            className={`flex items-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="text-left md:flex md:space-x-6 md:space-y-0">
              {loggedInStatus ? (
                <>
                  <Link to="/offers">
                    <li
                      className={`${
                        activeMenu === "Offers"
                          ? "menu-btn-purple-active"
                          : "menu-btn-purple"
                      } md:mb-0 mb-2`}
                    >
                      Offers
                    </li>
                  </Link>
                  {user?.acount_type === userTypes.employer && (
                    <Link to="/talent-list">
                      <li
                        className={`${
                          activeMenu === "StudentList"
                            ? "menu-btn-purple-active"
                            : "menu-btn-purple"
                        } md:mb-0 mb-2`}
                      >
                        Talent List
                      </li>
                    </Link>
                  )}

                  {user?.acount_type === userTypes.talent && (
                    <a href="https://medi-lx.xyz/cont/home/" target="_blank">
                      <li className="menu-btn-purple md:mb-0 mb-2">
                        Refer Curriculum
                      </li>
                    </a>
                  )}

                  <Link to="/profile">
                    <li
                      className={`${
                        activeMenu === "Profile"
                          ? "menu-btn-purple-active"
                          : "menu-btn-purple"
                      } md:mb-0 mb-2`}
                    >
                      Profile
                    </li>
                  </Link>

                  <li
                    className="menu-btn-purple md:mb-0 mb-2"
                    onClick={handleMediLogout}
                  >
                    Logout
                  </li>
                </>
              ) : (
                <li
                  className="menu-btn-purple md:mb-0 mb-2"
                  onClick={handleMediConnect}
                >
                  Login
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer className="z-60" />
    </nav>
  );
}
