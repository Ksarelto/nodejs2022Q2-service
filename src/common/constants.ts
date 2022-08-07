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

export { errorMessage, databaseType, passwordStrength };
