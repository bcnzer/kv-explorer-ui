export default function(name) {
  const nameEQ = name + '='
  const allCookies = document.cookie.split(';')
  for (var i = 0; i < allCookies.length; i++) {
    let cookie = allCookies[i]
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1, cookie.length)
    }
    if (cookie.indexOf(nameEQ) == 0) {
      return cookie.substring(nameEQ.length, cookie.length)
    }
  }
  return null
}
