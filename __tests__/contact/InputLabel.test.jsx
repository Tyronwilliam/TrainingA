import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";

import { InputString } from "../../app/InputLabel";
import { mockFormikTouched, mockFormikUntouched } from "../../__mocks__/formik";

export const renderInputString = (props) => {
  return render(<InputString {...props} />);
};

describe("InputString Component", () => {});
