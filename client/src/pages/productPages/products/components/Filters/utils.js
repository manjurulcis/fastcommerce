import queryString from "query-string";

// Append new query with last query
export function appendQuery(location, query) {
  const parsed = queryString.parse(location.search);
  let pathname = location.pathname;
  if (pathname.slice(-1) !== "/") {
    pathname += "/";
  }
  return {
    ...location,
    pathname,
    search: "?" + queryString.stringify({ ...parsed, ...query })
  };
}

export function removeQuery(location, queries) {
  let parsed = queryString.parse(location.search);
  try {
    queries.map(query => delete parsed[query]);
  } catch {
    delete parsed[queries];
  }
  return {
    ...location,
    search: "?" + queryString.stringify(parsed)
  };
}
