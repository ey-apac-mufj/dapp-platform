import React from "react";
import Student1 from "../images/student1.png";
import { userTypes } from "../../const/yourDetails";

export default function ProfileDetails({ userDetails }) {
  return (
    <>
      <div className="white-card-div w-full md:w-1/2 mx-auto px-0 pt-0 mb-10 pb-6 rounded-lg mt-6">
        <div className="relative h-40">
          <div className="w-full h-full bg-blue-400 rounded-t-lg"></div>
        </div>
        <div className="relative shadow mx-auto h-40 w-40 -my-16 border-white rounded-full overflow-hidden border-4">
          <img
            className="object-cover w-full h-full"
            src={userDetails?.picture || Student1}
          />
        </div>
        <div className="mt-12 pt-4 px-5">
          <h5 className="text-center text-3xl font-thin antonFont mt-3">
            {userDetails?.userName}
          </h5>
          <h5 className="text-center text-md font-semibold mt-1">
            {userTypes.employer == userDetails?.acount_type && "Employer"}
            {userTypes.talent == userDetails?.acount_type && "Talent"}
            {userTypes.instructor == userDetails?.acount_type && "Instructor"}
          </h5>
          <table className="table-auto w-full rounded-md border-gray-600 mt-6">
            <tbody>
              <tr className="bg-gray-200">
                <th className="py-2">Wallet address: </th>
                <td>
                  {userDetails?.walletAddress.substring(0, 8) +
                    "..." +
                    userDetails?.walletAddress.substring(
                      userDetails?.walletAddress.length - 4
                    )}{" "}
                  <span
                    className="px-1 py-1 bg-gray-400 rounded-lg cursor-pointer"
                    onClick={() => copyText(userDetails?.walletAddress)}
                  >
                    Copy
                  </span>
                </td>
              </tr>
              <tr>
                <th className="py-2">User Name: </th>
                <td>{userDetails?.userName} </td>
              </tr>
              <tr className="bg-gray-200">
                <th className="py-2">User Id: </th>
                <td>{userDetails?.userId}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
