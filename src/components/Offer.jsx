import React from "react";

export default function Offer({ offer, onAccept, onDecline }) {
  return (
    <div className="rounded-lg shadow-xl mx-auto h-full w-full cursor-pointer bg-white pt-2">
      <div className="text-center px-4 py-4">
        <h5 className="my-1 font-bold text-xl">Company: {offer.company}</h5>
        <h5 className="my-1">Salary: {offer.salary}</h5>
        <h5 className="my-1">Contract: {offer.contract}</h5>
        <h5 className="my-2"> {offer.jobDescription} </h5>
        <div className="mx-auto flex justify-content text-center mb-2">
          <button onClick={() => onAccept(offer.offerIndex)} className="font-medium bg-green-600 hover:bg-green-500 rounded-lg px-3.5 py-2.5 text-sm text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mt-2 mx-auto">
            Accept
          </button>
          <button onClick={() => onDecline(offer.offerIndex)} className="font-medium bg-red-600 hover:bg-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mt-2 mx-auto">
            Decline
          </button>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}
