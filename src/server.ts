import axios from "axios";
import * as bodyParser from "body-parser";
import * as express from "express";
import {
  getNextWebsite,
  getPreviousWebsite,
  getRandomSiteList,
  getRandomWebsite,
  getWebsite,
} from "./db";
import { WidgetCreationRequest } from "./types";
import { generateWidget } from "./widget";
import { getCachedWidgetData, updateCacheForSite } from "./widget-cache";

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

app.use(bodyParser.urlencoded());
app.set("view engine", "vash");

app.use("/assets", express.static("assets"));

app.get("/:website/next/navigate", (req, res) => {
  const website = req.params.website;
  const result = getNextWebsite(website);
  res.redirect(result.url);
});

app.get("/:website/previous/navigate", (req, res) => {
  const website = req.params.website;
  const result = getPreviousWebsite(website);
  res.redirect(result.url);
});

app.get("/:website/random/navigate", (req, res) => {
  const website = req.params.website;
  const random = getRandomWebsite(website);
  res.redirect(random.url);
});

app.get("/:website/next", (req, res) => {
  const website = req.params.website;
  const result = getNextWebsite(website);
  res.send(result);
});

app.get("/:website/previous", (req, res) => {
  const website = req.params.website;
  const result = getPreviousWebsite(website);
  res.send(result);
});

app.get("/:website/random", (req, res) => {
  const website = req.params.website;
  const random = getRandomWebsite(website);
  res.send(random);
});

app.get("/widget/:website/navigate", (req, res) => {
  // This one doesn't update the cache because we don't
  // want the scenario where the user sees a banner and when
  // they click, it navigates to a different website.
  const id = req.params.website;
  const current = getWebsite(id);

  const target = getCachedWidgetData(current);
  const website = getWebsite(target.targetWebsiteId);
  res.redirect(website.url);
});

// This is very rough, we should improve how we send the image
app.get("/widget/:website/image", async (req, res) => {
  const id = req.params.website;
  const current = getWebsite(id);
  updateCacheForSite(current);

  const target = getCachedWidgetData(current);
  const website = getWebsite(target.targetWebsiteId);

  if (!website.banner) {
    res.sendStatus(404);
    return;
  }

  try {
    const response = await axios.get(website.banner, {
      responseType: "arraybuffer",
    });

    // TODO: This has to be dynamic
    res.type("gif");
    res.send(response.data);
  } catch (ex) {
    console.log("Got error: " + ex.message, ex);
  }
});

app.get("/:website/widget", (req, res) => {
  const id = req.params.website;
  const current = getWebsite(id);
  updateCacheForSite(current);

  const target = getCachedWidgetData(current);
  const website = getWebsite(target.targetWebsiteId);

  res.render("iframe-widget", { website, current });
});

app.get("/random", (_, res) => {
  const random = getRandomWebsite();
  res.send(random);
});

app.get("/random/navigate", (_, res) => {
  const random = getRandomWebsite();
  res.redirect(random.url);
});

app.get("/random/list", (_, res) => {
  const randomSites = getRandomSiteList(5);
  res.send(randomSites);
});

app.get("/submit", (_, res) => {
  res.render("submit-website", {});
});

app.get("/widget", (req, res) => {
  res.render("widget", {});
});

app.post("/widget", (req, res) => {
  const { websiteId, widgetType } = {
    ...req.body,
    widgetType: req.body.widgetType.toLowerCase(),
  } as WidgetCreationRequest;

  if (!websiteId) {
    res.render("widget", {
      error: "A website ID from the email has to be provided.",
    });
    return;
  }

  const website = getWebsite(websiteId);

  if (!website) {
    res.render("widget", {
      error: "The website provided wasn't found.",
    });
    return;
  }

  const generatedWidget = generateWidget(website, widgetType);

  res.render("widget", {
    generatedWidget,
    website,
    websiteId,
    websiteType: req.body.websiteType,
  });
});

app.get("/", (_, res) => {
  const randomSites = getRandomSiteList(5);

  // I'm not sure we should keep this as it's a bit hacky
  const images = [
    "animated_bullet_009.gif",
    "animated_bullet_011.gif",
    "animated_bullet_014.gif",
  ];

  let index = 0;

  const arrows = randomSites.map((site) => {
    const image = images[index];
    index = ++index >= images.length ? 0 : index;
    return image;
  });

  res.render("home", { randomSites, arrows });
});

app.listen(port, "0.0.0.0", () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
