import * as express from "express";
import * as bodyParser from "body-parser";
import {
  getNextWebsite,
  getPreviousWebsite,
  getRandomSiteList,
  getRandomWebsite,
  getWebsite,
} from "./db";
import { WidgetCreationRequest } from "./types";
import { generateWidget } from "./widget";

const app = express();
const port = process.env.PORT || 3001;

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

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
