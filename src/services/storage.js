export function saveItem(key, value) {
  // localStorage.setItem(key, value);

  const exdate = new Date();

  if (key === 'refreshToken') {
    exdate.setDate(exdate.getDate() + 14);
  }

  exdate.setSeconds(exdate.getSeconds() + 3600);

  document.cookie = `${key} = ${value}; expires = ${exdate.toUTCString()}`;
}

export function loadItem(key) {
  // return localStorage.getItem(key);

  const decodedCookie = decodeURIComponent(document.cookie);
  const val = decodedCookie.split(';');

  for (let i = 0; i < val.length; i += 1) {
    const x = val[i].substring(0, val[i].indexOf('=')).replace(/^\s+|\s+$/g, '');
    const y = val[i].substring(val[i].indexOf('=') + 1);

    if (x === key) {
      return y;
    }
  }

  return null;
}

export function deleteItem(key) {
  // localStorage.removeItem(key);

  const date = new Date();

  date.setDate(date.getDate() - 1); // 이전 날짜로 설정.

  document.cookie = `${key} = ; expires = ${date.toUTCString()}`;
}
