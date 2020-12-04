export function cookieContains(cookies) {
  const cookiesArr = cookies.split(';');
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i].includes('email'))
      return true;
  }
  return false;
}