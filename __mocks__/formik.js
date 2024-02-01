const paramsFormik = {
  initialValues: {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    companyName: "",
    subject: "",
    message: "",
  },
  values: {
    firstname: "",
    lastname: "John",
    email: "",
    phone: "",
    companyName: "",
    subject: "",
    message: "",
  },
  onSubmit: jest.fn(),
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
};

export const mockFormikTouched = {
  initialValues: paramsFormik.initialValues,
  values: paramsFormik.values,
  touched: { lastname: true },
  onSubmit: paramsFormik.onSubmit,
  handleBlur: paramsFormik.handleBlur,
  handleChange: paramsFormik.handleChange,
  errors: { lastname: "Test error message" },
};
export const mockFormikUntouched = {
  initialValues: paramsFormik.initialValues,
  values: paramsFormik.values,
  touched: { lastname: false },
  onSubmit: paramsFormik.onSubmit,
  handleBlur: paramsFormik.handleBlur,
  handleChange: paramsFormik.handleChange,
};
