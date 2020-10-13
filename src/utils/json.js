export function parse(str) {
  try {
    if (typeof str === 'object') {
      return str;
    }

    const parsed = JSON.parse(str);

    if (typeof parsed !== 'object') {
      return null;
    }

    return parsed;
  } catch (error) {
    return null;
  }
}

export function stringify(json, spaces = 2) {
  if (!json) {
    return '';
  }

  if (typeof json === 'string') {
    return json;
  }

  return JSON.stringify(json, null, spaces);
}

export function format(str, spaces = 2) {
  const parsed = parse(str);

  if (!parsed) {
    return null;
  }

  return stringify(parsed, spaces);
}
