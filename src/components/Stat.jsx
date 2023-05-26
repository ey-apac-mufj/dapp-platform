import React from "react";

export default function Stat({ title, number, border = true }) {
  return (
    <div className={(border ? "md:border-r-2 md:border-white" : "") + "py-5"}>
      <h5 className="museoFont">{title}</h5>
      <h5 className="museoFont">{number}</h5>
    </div>
  );
}
