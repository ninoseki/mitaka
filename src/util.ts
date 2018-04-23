export function removeSquareBrackets(query) {
  return query.replace(/[\[\]']+/g, '');
}

export const defaultIsURLOptions = {
  protocols: ['http', 'https'],
  require_tld: true,
  require_protocol: true,
  require_host: true,
  require_valid_protocol: true,
  allow_underscores: true,
  allow_trailing_dot: true,
  allow_protocol_relative_urls: false,
};
