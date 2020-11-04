export interface Token {
  idToken: string;
  refreshToken: string;
}

export interface User {
  email: string;
  token: Token;
}

const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const nameRegEx = /^[a-zA-Z '.-]*$/;

export const regex = Object.freeze({
  email: emailRegEx,
  password: passwordRegEx,
  name: nameRegEx
})

export interface RegistrationForm {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
