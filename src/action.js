export function setRefreshToken(refreshToken) {
  return {
    type: 'setRefreshToken',
    payload: refreshToken,
  };
}

export function setAccountInfo(accountInfo) {
  return {
    type: 'setAccountInfo',
    payload: accountInfo,
  };
}

export function setDisplayName(displayName) {
  return {
    type: 'setDisplayName',
    payload: displayName,
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
