import React from "react";
import { Link } from "react-router-dom";

export default function CategoryThumbnail({ category }) {
  return (
    // If the category is active then redirect to the category page
    <Link to={category.active ? "/community-category/" + category.slug : ""}>
      <div className="relative cursor-pointer hover:drop-shadow-2xl text-white hover:text-gray-300">
        <img src={category.image} alt="" className="h-90 rounded-xl mx-auto" />
        <div className="absolute bottom-0 px-4 py-3 bg-gray-500/50 w-full rounded-xl">
          <h1 className="font-semibold text-4xl museoFont">{category.title}</h1>
        </div>
      </div>
    </Link>
  );
}
