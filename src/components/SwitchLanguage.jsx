import React, { useState, useEffect, useRef, useContext } from "react";
import useComponentVisible from "./useComponentVisible";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";

const SwitchLanguage = () => {
  const cookies = new Cookies(null, { path: "/" });
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState("jp");
  const popupRef = useRef(null);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible();
  const { i18n } = useTranslation();

  const getPrefferedLanguage = async () => {
    let preferredLanguage = await cookies.get("preferredLanguage");
    if (!preferredLanguage) {
      setPreferredLanguage("jp");
      i18n.changeLanguage("jp");
    } else {
      setPreferredLanguage(preferredLanguage);
      i18n.changeLanguage(preferredLanguage);
    }
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setPreferredLanguage(lang);
    cookies.set("preferredLanguage", lang);
  };

  const togglePopup = () => {
    setIsPopupVisible(!isComponentVisible); // Toggle the visibility
    setIsComponentVisible(!isComponentVisible);
  };

  useEffect(() => {
    getPrefferedLanguage();
  }, []);

  return (
    <div className="fixed bottom-5 right-5" ref={ref}>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-3 rounded-full focus:outline-none shadow-xl"
        onClick={togglePopup}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
          />
        </svg>
      </button>
      {isPopupVisible && isComponentVisible && (
        <div
          ref={popupRef}
          className="absolute bottom-14 right-0 bg-white border border-gray-200 shadow-lg rounded-lg"
        >
          <button
            className={`block px-4 py-2 hover:bg-gray-100 w-full text-left ${
              preferredLanguage === "en" ? "bg-gray-100 font-medium" : ""
            }`}
            onClick={() => changeLanguage("en")}
          >
            English
          </button>
          <button
            className={`block px-4 py-2 hover:bg-gray-100 w-full text-left ${
              preferredLanguage === "jp" ? "bg-gray-100" : ""
            }`}
            onClick={() => changeLanguage("jp")}
          >
            日本語
          </button>
        </div>
      )}
    </div>
  );
};

export default SwitchLanguage;
