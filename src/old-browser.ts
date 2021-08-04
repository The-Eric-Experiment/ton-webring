import { Request } from "express";

export function isOldBrowser(req: Request) {
  const userAgent = req.useragent;

  const major = parseFloat(userAgent.version);

  if ((userAgent.isFirefox || userAgent.isChrome) && major < 50) {
    return true;
  }

  if (userAgent.isSafari && major < 4) {
    return true;
  }

  if (userAgent.isOpera && major < 60) {
    return true;
  }

  if (
    userAgent.isIE ||
    userAgent.browser.toLowerCase().includes("netscape") ||
    userAgent.browser.toLowerCase().includes("other") ||
    userAgent.browser.toLowerCase() === "mozilla"
  ) {
    return true;
  }

  return false;
}
