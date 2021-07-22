import { DateTime } from "luxon";
import { getRandomWebsite } from "./db";
import { Website } from "./types";

// Doing the widget cache in memory here for now,
// we can move it to redis eventually.
type CacheData = {
  time: DateTime;
  targetWebsiteId: string;
};

let cache: Record<string, CacheData> = {};

export function updateCacheForSite(website: Website) {
  let cachedSite = cache[website.id];
  if (!!cachedSite && cachedSite.time.diffNow().as("hours") > 1) {
    return;
  }

  const random = getRandomWebsite(website.id);
  cachedSite = cache[website.id] = {
    time: DateTime.local(),
    targetWebsiteId: random.id,
  };
}

export function getCachedWidgetData(website: Website) {
  if (!cache[website.id]) {
    updateCacheForSite(website);
  }

  return cache[website.id];
}
