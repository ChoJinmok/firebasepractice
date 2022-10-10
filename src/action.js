export function setIdToken(idToken) {
  return {
    type: 'setIdToken',
    payload: idToken,
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
