import React from "react";
import group from "./images/group.png";

export default function CommunityDetails({ community }) {
  return (
    <div className="text-left mx-auto justify-center landing-page">
      <div className="w-100 bg-blue-800 flex pt-8 pb-12 py-10">
        <div className="mr-auto pl-10">
          <h1 className="text-xl md:text-5xl font-bold text-white align-middle mt-10 md:ml-10">
            Welcome to the <br /> Demo Community
          </h1>
          <button className="bg-white px-2 text-sm md:text-xl md:px-5 py-2 rounded-lg md:ml-10 mt-9">
            Go to gourp Chat
          </button>
        </div>
        <div className="mx-auto pr-10">
          <img
            src={group}
            className="mx-auto mt-9 md:mt-1 w-[100px] md:w-[300px]"
            alt=""
          />
        </div>
      </div>
      <div className="mx-auto px-2 pt-8 h-100">
        <h2 className="text-center text-2xl font-bold">
          This is our Demo community page!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 px-10 mx-auto">
          <div className="posts px-5 py-6">
            <div className="w-100 px-4 py-4 rounded-lg bg-gray-300 shadow-lg">
              <h2 className="text-xl font-bold">This is a demo Post!</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
              <button className="bg-blue-800 text-white px-5 py-2 rounded-lg mt-9">
                Check Post
              </button>
            </div>
          </div>
          <div className="posts px-5 py-6">
            <div className="w-100 px-4 py-4 rounded-lg bg-gray-300 shadow-lg">
              <h2 className="text-xl font-bold">This is a demo Post!</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
              <button className="bg-blue-800 text-white px-5 py-2 rounded-lg mt-9">
                Check Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
