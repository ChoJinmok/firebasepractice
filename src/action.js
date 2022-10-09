export function setRefreshToken(refreshToken) {
  return {
    type: 'setRefreshToken',
    payload: {
      refreshToken,
    },
  };
}

// TODO : remove
export const xx = 'xx';
