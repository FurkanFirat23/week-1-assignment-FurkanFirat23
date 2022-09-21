//1 sessionStorage.setItem(key, value);

//2 sessioinStorage.getItem(key);

//3 localStorage.setItem(key, value);

//4  localStorage.getItem(key);

//PART I (Cookie)

function setCookie(name, value, daysToLive = undefined) {
  // Encode value in order to escape semicolons, commas, and whitespace
  let cookie = name + "=" + encodeURIComponent(value);

  if (typeof daysToLive === "number") {
    /* Sets the max-age attribute so that the cookie expires
        after the specified number of days */
    cookie += "; max-age=" + daysToLive * 24 * 60 * 60;
  }

  document.cookie = cookie;
}

function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  let cookieArr = document.cookie.split(";");

  // Loop through the array elements
  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");

    /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
    if (name == cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }

  // Return null if not found
  return null;
}

// very simple cookie manager class
class CookieManager {
  static setCookie({ name = "", days = 0, value = "", path = "/" }) {
    let expire = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 1000 * 60 * 60 * 24);
      expire = date.toUTCString();
    }
    document.cookie = `${name}=${value}; expires=${expire}; path=${path}`;
  }

  static getCookie({ name }) {
    name = name.trim();
    const allCookie = document.cookie;
    const cookieArr = [...allCookie.split(";")];
    for (let i = 0; i < cookieArr.length; i++) {
      let c = cookieArr[i].trim();
      if (c.startsWith(`${name}=`)) return c.split("=")[1];
    }
    return null;
  }

  static removeCookie({ name = "" }) {
    CookieManager.setCookie({ name, days: -1 });
  }

  static checkCookie({ name = "" }) {
    const cookie = CookieManager.getCookie({ name: name });
    if (cookie !== undefined && cookie !== "" && cookie !== null) {
      return true;
    } else {
      return false;
    }
  }
}

//add cookie
CookieManager.setCookie({
  name: "hi.cookie",
  value: "m9yhRuPk7xlCpkEGk8qdx",
  days: 10,
});
//get Cookie value
CookieManager.getCookie({ name: "hi.cookie" }); // return = m9yhRuPk7xlCpkEGk8qdx
//remove cookie
CookieManager.removeCookie({ name: "hi.cookie" }); // noting return
//remove cookie
CookieManager.checkCookie({ name: "hi.cookie" }); // return true or false

//PART II (sessionStorage)

sessionStorage.setItem("key", "value");
// Save data to sessionStorage

let data = sessionStorage.getItem("key");
// Get saved data from sessionStorage

sessionStorage.removeItem("key");
// Remove saved data from sessionStorage

sessionStorage.clear();
// Remove all saved data from sessionStorage

//example 1
let setsession = window.sessionStorage.setItem("animals", "cat");
let getsession = window.sessionStorage.getItem("animals");
console.log(getsession);

// example 2
sessionStorage.setItem("mode", "dark");
const mode = sessionStorage.getItem("mode");
console.log(mode); // 'dark'

//localStorage - stores data with no expiration date. window. sessionStorage - stores data for one session (data is lost when the browser tab is closed)
