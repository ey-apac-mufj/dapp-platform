import React from "react";

export default function CommunityThumbnail({ image, text }) {
  return (
    <div>
      <img src={image} alt="" className="h-full mx-auto" />
    </div>
  );
}
