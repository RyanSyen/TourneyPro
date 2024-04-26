// source: https://hilla.dev/docs/react/guides/client-caching

// the name of the cache for offline usage
const CACHE_NAME = "offline-cache";

export async function cacheable<T>(
  key: string,
  defaultValue: T,
  fn?: () => Promise<T> | undefined,
  data?: any | undefined,
  isUpdateCache?: boolean | null | undefined
) {
  let result;
  const isUpdate = isUpdateCache ?? false;
  try {
    if (fn === null && data === null)
      console.error("fn and data cannot be null, please provide either one!");
    // save the data to localStorage.
    const cache = getCache();
    if (cache[key] === undefined || cache[key] === null) {
      // if (fn !== null && fn !== undefined) {
      //   // retrieve the data from backend.
      //   result = await fn();
      // } else if (data != null) {
      //   result = data;
      // }

      result = fn ? await fn() : data ?? defaultValue;

      cache[key] = result;
      // TODO: encrypt data before setItem (future enhancement)
      localStorage.setItem(CACHE_NAME, JSON.stringify(cache));
    } else {
      if (isUpdate) {
        // if (fn !== null && fn !== undefined) {
        //   // retrieve the data from backend.
        //   result = await fn();
        // } else if (data != null) {
        //   result = data;
        // }

        result = fn ? await fn() : data ?? defaultValue;
        cache[key] = result;
        // TODO: encrypt data before setItem (future enhancement)
        localStorage.setItem(CACHE_NAME, JSON.stringify(cache));
      } else {
        console.log("retreiving cached value where key = " + key);
        result = cache[key];
      }
    }
  } catch {
    // if failed to retrieve the data from backend, try localStorage.
    const cache = getCache();
    const cached = cache[key];
    // use the cached data if available, otherwise the default value.
    result = cached === undefined ? defaultValue : cached;
  }

  return result;
}

function getCache(): any {
  const cache = localStorage.getItem(CACHE_NAME) || "{}";
  return JSON.parse(cache);
}

export function clearCache() {
  localStorage.removeItem(CACHE_NAME);
}
