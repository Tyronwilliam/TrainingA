// import React from "react";
// import ContactForm from "@/app/[lang]/contact/ContactForm";
// import "@testing-library/jest-dom";
// import { render, screen } from "@testing-library/react";

// export default async function resolvedComponent(Component, props) {
//   const ComponentResolved = await Component(props);
//   return () => ComponentResolved;
// }
// const dictionaryFR = {
//   contact: {
//     label: {
//       lastname: "Nom",
//       firstname: "Prénom",
//       email: "Email",
//       phone: "Téléphone",
//       companyName: "Nom de l'entreprise",
//       subject: "Sujet",
//       message: "Message",
//     },
//   },
//   cta: {
//     formEvent: {
//       send: "Envoyer",
//     },
//   },
// };

// jest.mock("next/navigation", () => ({
//   useRouter() {
//     return {
//       push: jest.fn(),
//       replace: jest.fn(),
//       back: jest.fn(),
//     };
//   },
//   usePathname() {
//     return "";
//   },
// }));

// const mockFormik = {
//   initialValues: {
//     firstname: "",
//     lastname: "",
//     email: "",
//     phone: "",
//     companyName: "",
//     subject: "",
//     message: "",
//   },
//   onSubmit: jest.fn(),
// };

// describe("Component ContactForm", () => {
//   it("renders ContactForm correctly", () => {
//     render(<ContactForm formik={mockFormik} dictionary={dictionaryFR} />);
//     const form = screen.getByTestId("form");
//     expect(form).toBeInTheDocument();
//   });
// });
