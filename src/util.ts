export function normalize(query) {
  let result = removeSquareBrackets(query);
  result = removeProtocol(result);
  result = removeLastSlash(result);
  return result;
}

export function removeSquareBrackets(query) {
  return query.replace(/[\[\]']+/g, '');
}

export function removeProtocol(query) {
  return query.replace(/(^\w+:|^)\/\//, '');
}

export function removeLastSlash(query) {
  if (query.slice(-1) === '/') {
    return query.slice(0, -1);
  }
  return query;
}
