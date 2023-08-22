import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Student1 from "../images/student1.png";
import { Link } from "react-router-dom";

export default function StudentThumbnail({ student, onHire }) {
  // Function to copy text to clipboard
  const copyText = (text) => {
    // console.log(text);
    navigator.clipboard.writeText(text);
    toast.success("Text is copied to your clipboard", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  return (
    <Link to={`/talents/${student.walletAddress}`}>
      <div className="rounded-lg shadow-xl h-full w-full cursor-pointer bg-white pt-2 text-black hover:bg-gray-50">
        <img
          src={student.picture || Student1}
          alt=""
          className="mx-auto h-40"
        />
        <div className="text-center px-4 py-4">
          <h5 className="my-1 font-bold text-xl">{student.userName}</h5>
          <h5 className="my-1">{student.age}</h5>
          <h5 className="my-2">
            {" "}
            {student.walletAddress.substring(0, 8) +
              "..." +
              student.walletAddress.substring(
                student.walletAddress.length - 4
              )}{" "}
            <span
              className="px-1 py-1 bg-gray-200 rounded-lg"
              onClick={() => copyText(student.walletAddress)}
            >
              Copy
            </span>
          </h5>
          <div className="mx-auto text-center">
            <button
              onClick={() => onHire(student.walletAddress)}
              className="font-medium bg-indigo-600 hover:bg-indigo-500 rounded-lg px-3.5 py-2.5 text-sm text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2 mx-auto"
            >
              Hire
            </button>
          </div>
        </div>

        <ToastContainer />
      </div>
    </Link>
  );
}
