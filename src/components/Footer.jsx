import React from "react";

export default function Footer({ t }) {
  return (
    <div className="w-100 px-5 md:px-20 py-4 border-t border-gray-300 antonFont">
      <h2 className="ml-10">{t("This is footer")}</h2>
    </div>
  );
}
