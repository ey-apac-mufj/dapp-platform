import React from "react";

export default function CommunityThumbnail({
  community,
  handleCommunityRedirect,
}) {
  return (
    <div className="relative cursor-pointer" onClick={handleCommunityRedirect}>
      <img src={community.image} alt="" className="h-full mx-auto" />
      <div className="absolute bottom-0 px-4 py-3 bg-gray-500/50 w-full">
        <h1 className="text-white font-semibold text-4xl museoFont">
          {community.title}
        </h1>
      </div>
    </div>
  );
}
