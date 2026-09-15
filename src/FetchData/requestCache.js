import axios from 'axios';

const DEFAULT_TTL = 7 * 24 * 60 * 60 * 1000;
const memoryCache = new Map();
const pendingRequests = new Map();

function readStored(key) {
  try {
    const stored = sessionStorage.getItem(`sahas-cache:${key}`);
    if (!stored) return null;

    const entry = JSON.parse(stored);
    if (entry.expiresAt <= Date.now()) {
      sessionStorage.removeItem(`sahas-cache:${key}`);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function writeStored(key, data, ttl) {
  try {
    sessionStorage.setItem(`sahas-cache:${key}`, JSON.stringify({
      data,
      expiresAt: Date.now() + ttl,
    }));
  } catch {
    // Storage can be unavailable in private browsing; memory caching still works.
  }
}

export function invalidateRequest(url) {
  memoryCache.delete(url);
  pendingRequests.delete(url);
  try {
    sessionStorage.removeItem(`sahas-cache:${url}`);
  } catch {
    // Ignore unavailable browser storage.
  }
}

export async function getCached(url, { ttl = DEFAULT_TTL, force = false } = {}) {
  if (!force) {
    const memoryEntry = memoryCache.get(url);
    if (memoryEntry && memoryEntry.expiresAt > Date.now()) return memoryEntry.data;

    const storedData = readStored(url);
    if (storedData !== null) {
      memoryCache.set(url, { data: storedData, expiresAt: Date.now() + ttl });
      return storedData;
    }

    if (pendingRequests.has(url)) return pendingRequests.get(url);
  }

  const request = axios.get(url).then(({ data }) => {
    memoryCache.set(url, { data, expiresAt: Date.now() + ttl });
    writeStored(url, data, ttl);
    return data;
  }).finally(() => {
    pendingRequests.delete(url);
  });

  pendingRequests.set(url, request);
  return request;
}