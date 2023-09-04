import React, { useContext } from "react";
import Student1 from "../images/student1.png";
import { userTypes } from "../../const/yourDetails";
import { LoginContext } from "../contexts/LoginContext";
import UtilityFunctions from "../utilities/UtilityFunctions";

export default function ProfileDetails({ t }) {
  const { userData } = useContext(LoginContext);
  return (
    <>
      <div className="white-card-div w-full md:w-1/2 mx-auto px-0 pt-0 mb-10 pb-6 rounded-lg mt-6">
        <div className="relative h-40">
          <div className="w-full h-full bg-blue-400 rounded-t-lg"></div>
        </div>
        <div className="relative shadow mx-auto h-40 w-40 -my-16 border-white rounded-full overflow-hidden border-4">
          <img
            className="object-cover w-full h-full"
            src={userData?.picture || Student1}
          />
        </div>
        <div className="mt-12 pt-4 px-5">
          <h5 className="text-center text-3xl font-thin antonFont mt-3">
            {userData?.userName}
          </h5>
          <h5 className="text-center text-md font-semibold mt-1">
            {userTypes.employer == userData?.acount_type && t("Employer")}
            {userTypes.talent == userData?.acount_type && t("Talent")}
            {userTypes.instructor == userData?.acount_type && t("Instructor")}
          </h5>
          <table className="table-auto w-full rounded-md border-gray-600 mt-6">
            <tbody>
              <tr className="bg-gray-200">
                <th className="py-2">{t("Wallet address:")} </th>
                <td>
                  {userData?.walletAddress.substring(0, 8) +
                    "..." +
                    userData?.walletAddress.substring(
                      userData?.walletAddress.length - 4
                    )}{" "}
                  <span
                    className="px-1 py-1 bg-gray-400 rounded-lg cursor-pointer"
                    onClick={() =>
                      UtilityFunctions.copyText(userData?.walletAddress)
                    }
                  >
                    {t("Copy")}
                  </span>
                </td>
              </tr>
              <tr>
                <th className="py-2">{t("User Name:")} </th>
                <td>{userData?.userName} </td>
              </tr>
              <tr className="bg-gray-200">
                <th className="py-2">{t("User Id:")} </th>
                <td>{userData?.userId}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
