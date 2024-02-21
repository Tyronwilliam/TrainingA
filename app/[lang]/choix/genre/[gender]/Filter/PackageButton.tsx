import React from "react";

const PackageButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="font-medium text-base md:text-xl uppercase"
    >
      <li>Package</li>
    </button>
  );
};

export default PackageButton;
