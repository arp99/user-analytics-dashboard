export function getCookie(cookieName) {
  const name = `${cookieName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

export function setCookie(cookieName, cookieValue) {
  document.cookie = `${cookieName}=${cookieValue};path=/`;
}

export function deleteCookie(cookieName) {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function formQueryString(filters) {
  const params = new URLSearchParams();

  // Assuming 'filters' is an object containing key-value pairs for filters
  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      params.append(key, filters[key]);
    }
  });

  // Create the query string URL
  const queryString = params.toString();

  return queryString;
}

export function copyToClipboard(text) {
  const tempInput = document.createElement("textarea");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  return true;
}

export function searchStringToObject(searchString) {
  const params = new URLSearchParams(searchString);
  const searchParams = {};

  for (const [key, value] of params.entries()) {
    searchParams[key] = decodeURIComponent(value);
  }

  return searchParams;
}
