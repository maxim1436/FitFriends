export const SALT_ROUNDS = 10;
export const DEFAULT_USER_COUNT = 50;

export enum UserMessage {
  USER_EXISTS = 'User with this email exists',
  USER_NOT_FOUND = 'User not found',
  FRIEND_NOT_FOUND = 'Your friend not found',
  POSSIBLE_FRIEND_NOT_FOUND = 'Possible friend not found',
  UNKNOWN_FRIEND_LIST_UPDATE_TYPE = 'Unknown friend list update type',
  USER_PASSWORD_WRONG = 'User password is wrong',
  USER_EMAIL_NOT_VALID = 'The email is not valid',
  USER_ROLE_WRONG = 'User role is wrong',
  UPDATE_USER_WRONG = 'You can update only your account',
  GET_FRIENDS_USER_WRONG = 'You can get only your friends',
  FRIENDSHIP_ASK_NOT_FOUND = 'Friendship ask not found',
}
