export function setAccessToken(accessToken) {
  return {
    type: 'setAccessToken',
    payload: {
      accessToken,
    },
  };
}

// TODO : remove
export const xx = 'xx';
