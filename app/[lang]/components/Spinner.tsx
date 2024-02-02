import React from "react";

const Spinner = () => {
  return (
    <div className="h-5 w-5 mr-3 lds-ring">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
