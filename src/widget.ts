import { Website, WidgetType } from "./types";

function generateTextWidget(website: Website) {
  return `
    <b>This site is a proud member of the TheOldNet webring! Check some other cool websites!</b><br>
    <a href="/${website.id}/previous/navigate">Previous site</a> -- 
    <a href="/${website.id}/random/navigate">Random site</a> -- 
    <a href="/${website.id}/next/navigate">Next site</a>
  `;
}

function generateImageWidget(website: Website) {
  return `
    <img src="/assets/banner.gif" alt="theoldnet.net nvigation" usemap="#theoldnetmap">
    <map name="theoldnetmap">
        <area shape="rect" coords="9,28,111,53" alt="Previous theoldnet site" href="/${website.id}/previous/navigate">
        <area shape="rect" coords="248,28,350,53" alt="Random theoldnet site" href="/${website.id}/random/navigate">
        <area shape="rect" coords="490,28,592,53" alt="Next theoldnet site" href="/${website.id}/next/navigate">
        <area shape="rect" coords="340,6,460,22" alt="Main theoldnet site" href="http://www.theoldnet.com">
    </map>
  `;
}

export function generateWidget(website: Website, widgetType: WidgetType) {
  switch (widgetType) {
    case WidgetType.Text:
      return generateTextWidget(website);
    case WidgetType.Image:
    default:
      return generateImageWidget(website);
  }
}
