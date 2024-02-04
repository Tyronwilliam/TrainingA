import React from "react";

const Helpers = ({
  classStyle,
  helper,
}: {
  classStyle: string;
  helper: string;
}) => {
  return <p className={classStyle}>{helper}</p>;
};

export default Helpers;
