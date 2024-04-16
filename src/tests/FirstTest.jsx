import React, { useState } from "react";

const FirstTest = () => {
  const [message, setMessage] = useState("");
  const testFunction = () => {
    setMessage("The button click worked successfully");
  };
  return (
    <div>
      <h2>First test</h2>
      <p>{message}</p>
      <button onClick={testFunction}>Click Button</button>
    </div>
  );
};

export default FirstTest;
