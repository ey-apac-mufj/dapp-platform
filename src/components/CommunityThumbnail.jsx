import React from "react";

export default function CommunityThumbnail({
  community,
  handleCommunityRedirect,
}) {
  return (
    <div
      className="relative cursor-pointer hover:drop-shadow-2xl text-white hover:text-gray-300"
      onClick={handleCommunityRedirect}
    >
      <img src={community.image} alt="" className="h-80 mx-auto" />
      <div className="absolute bottom-0 px-4 py-3 bg-gray-500/50 w-full">
        <h1 className="font-semibold text-4xl museoFont">{community.title}</h1>
      </div>
    </div>
  );
}
