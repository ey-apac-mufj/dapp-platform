import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StudentThumbnail({ student, onHire }) {
  const copyText = (text) => {
    console.log(text);
    navigator.clipboard.writeText(text);
    toast.success("Text is copied to your clipboard", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="rounded-lg shadow-xl h-full w-full cursor-pointer bg-white pt-2">
      <img src={student.image} alt="" className="mx-auto h-40" />
      <div className="text-center px-4 py-4">
        <h5 className="my-1 font-bold text-xl">{student.name}</h5>
        <h5 className="my-1"> {student.bio}</h5>
        <h5 className="my-2">
          {" "}
          {student.walletAddress}{" "}
          <span
            className="px-1 py-1 bg-gray-200 rounded-lg"
            onClick={() => copyText(student.walletAddress)}
          >
            Copy
          </span>
        </h5>
        <div className="mx-auto text-center">
          <button
            onClick={onHire}
            className="font-medium bg-indigo-600 hover:bg-indigo-500 rounded-lg px-3.5 py-2.5 text-sm text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2 mx-auto"
          >
            Hire
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
