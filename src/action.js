export function setAccessToken(accessToken) {
  return {
    type: 'setAccessToken',
    payload: accessToken,
  };
}

export function setInit(init) {
  return {
    type: 'setInit',
    payload: init,
  };
}
