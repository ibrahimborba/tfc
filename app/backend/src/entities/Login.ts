import IUser from '../interfaces/IUser';
import ValidationError from '../errors/ValidationError';

export default class Login implements IUser {
  private _email: string;
  private _password: string;
  private static minPasswordLength = 6;

  constructor(email: string, password: string) {
    Login.validateEmail(email);
    Login.validatePassword(password);
    this._email = email;
    this._password = password;
  }

  private static validateEmail(email: string) {
    const emailRegex = /\S+@\S+\.\S/;
    const isEmailValid = emailRegex.test(email);
    if (!email || email.length < 1) {
      throw new ValidationError(400, 'All fields must be filled');
    }
    if (!isEmailValid) {
      throw new ValidationError(401, 'Incorrect email or password');
    }
  }

  private static validatePassword(password: string) {
    if (!password || password.length < 1) {
      throw new ValidationError(400, 'All fields must be filled');
    }
    if (password.length < Login.minPasswordLength) {
      throw new ValidationError(
        401,
        `password length must be at least ${Login.minPasswordLength} characters long`,
      );
    }
  }

  get email(): string { return this._email; }
  get password(): string { return this._password; }
}
