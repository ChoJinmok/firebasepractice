export function setRefreshToken(refreshToken) {
  return {
    type: 'setRefreshToken',
    payload: refreshToken,
  };
}

export function setUid(uid) {
  return {
    type: 'setUid',
    payload: uid,
  };
}

export function setInit(init) {
  return {
    type: 'setInit',
    payload: init,
  };
}

export function logout() {
  return {
    type: 'logout',
  };
}
