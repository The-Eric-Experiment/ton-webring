import * as fs from "fs";
import * as path from "path";
import * as yaml from "yaml";
import { Website } from "./types";

const websitesYaml = fs.readFileSync(
  path.join(__dirname, "..", "websites.yaml"),
  { encoding: "utf-8" }
);

const websites: Website[] = yaml.parse(websitesYaml);

export function getWebsite(id: string) {
  return websites.find((w) => w.id === id);
}

// Should probably cache this
export function getRandomSiteList(total: number = websites.length) {
  const indexes = new Array(total);
  const len = websites.length;
  if (total > len)
    throw new RangeError("getRandomSites: more elements taken than available");

  while (total > 0) {
    const index = Math.floor(Math.random() * len);
    if (!indexes.includes(index)) {
      indexes[--total] = index;
    }
  }

  return indexes.map((i) => websites[i]);
}

export function getRandomWebsite(currentId: string = "") {
  const filtered = websites.filter((w) => w.id !== currentId);

  const index = Math.floor(Math.random() * filtered.length);
  return filtered[index];
}

export function getNextWebsite(id: string) {
  const index = websites.findIndex((w) => w.id === id);
  let next = index + 1;
  if (next >= websites.length) {
    next = 0;
  }

  return websites[next];
}

export function getPreviousWebsite(id: string) {
  const index = websites.findIndex((w) => w.id === id);
  let previous = index - 1;
  if (previous < 0) {
    previous = websites.length - 1;
  }

  return websites[previous];
}
