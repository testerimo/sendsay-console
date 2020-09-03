function isEmpty(value) {
  return value.trim() === '';
}

function isEmail(value) {
  const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
  return re.test(value);
}

export function includesCyrillicCharacters(value) {
  const re = /[ЁёА-я]/g;
  return re.test(value);
}

export function includesRestrictedCharacters(value) {
  const re = /[^\w_]/;
  return value.match(re);
}

export function isLoginCorrect(login) {
  if (isEmpty(login)) {
    return false;
  }

  if (isEmail(login)) {
    return true;
  }

  if (
    includesCyrillicCharacters(login) ||
    includesRestrictedCharacters(login)
  ) {
    return false;
  }

  return true;
}

export function isSubloginCorrect(sublogin) {
  if (
    includesCyrillicCharacters(sublogin) ||
    includesRestrictedCharacters(sublogin)
  ) {
    return false;
  }

  return true;
}

export function isPasswordCorrect(password) {
  if (
    isEmpty(password) ||
    includesCyrillicCharacters(password)
  ) {
    return false;
  }

  return true;
}
