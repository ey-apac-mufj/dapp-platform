import React from "react";

export default function CommunityThumbnail({
  community,
  handleCommunityRedirect,
  t,
}) {
  return (
    // if active then redirect to the community page
    <div
      className="relative cursor-pointer hover:drop-shadow-2xl text-white hover:text-gray-300"
      onClick={community.active ? handleCommunityRedirect : () => {}}
    >
      <img src={community.image} alt="" className="h-90 mx-auto rounded-xl" />
      <div className="absolute bottom-0 px-4 py-3 bg-gray-500/50 w-full rounded-xl">
        <h1 className="font-semibold text-4xl museoFont">
          {t(community.title)}
        </h1>
      </div>
    </div>
  );
}
