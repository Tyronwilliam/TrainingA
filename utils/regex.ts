export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^.{8,}$/;

export const phoneNumberRegex = /^\d{10}$/;
export const postalCodeRegex = /^\d{5}$/;
const regexPattern = "^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\\d{4}$";
export const RegexNaissance = new RegExp(regexPattern);

export const socSecNumberRegex = /^\d{15}$/;
