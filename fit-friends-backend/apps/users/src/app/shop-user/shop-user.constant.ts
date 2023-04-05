export const SALT_ROUNDS = 10;
export const DEFAULT_USER_COUNT = 50;

export enum UserMessage {
  USER_EXISTS = 'User with this email exists',
  USER_NOT_FOUND = 'User not found',
  USER_PASSWORD_WRONG = 'User password is wrong',
  USER_EMAIL_NOT_VALID = 'The email is not valid',
  USER_ROLE_WRONG = 'User role is wrong',
  UPDATE_USER_WRONG = 'You can update only your account',
}
