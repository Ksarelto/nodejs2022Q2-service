const errorMessage = {
  INVALID_ID: 'Invalid Id',
  INVALID_TOKEN: 'Invalid token',
  EMPTY_TOKEN: 'Empty token',
  NO_SECRET: 'No secret for token',
  NO_USER: 'User not found',
  albums: 'Album not found',
  tracks: 'Track not found',
  artists: 'Artist not found',
  WRONG_PASS: 'Wrong old password',
  ERR_AUTH: 'Error during login',
  NO_REFRESH: 'No refresh token',
};

const databaseType = 'postgres';

const passwordStrength = 7;

export const LogLevelsObject = {
  crit: 0,
  error: 1,
  warn: 2,
  info: 3,
  http: 4,
};

export const LogColorsObject = {
  crit: 'white redBG',
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
};

export const defaultAdmin = {
  name: 'Admin',
  login: 'admin',
  password: 'admin',
};

export { errorMessage, databaseType, passwordStrength };
