import { Website, WidgetType } from "./types";

function generateBannerExchasngeWidget(website: Website) {
  return `
  <a href="/widget/${website.id}/navigate"><img src="/widget/${website.id}/image" alt="${website.name}" border="0"></a><br>
  <font size="-1">
    Proud member of <a href="http://www.theoldnet.com"><b>TheOldNet</b></a> webring! Check some other cool websites!<br>
    [<a href="/${website.id}/previous/navigate">Previous site</a>] -
    [<a href="/${website.id}/random/navigate">Random site</a>] -
    [<a href="/${website.id}/next/navigate">Next site</a>]
  </font>
  `;
}

function generateTextWidget(website: Website) {
  return `
    <b>This site is a proud member of the TheOldNet webring! Check some other cool websites!</b><br>
    <a href="/${website.id}/previous/navigate">Previous site</a> -- 
    <a href="/${website.id}/random/navigate">Random site</a> -- 
    <a href="/${website.id}/next/navigate">Next site</a>
  `;
}

function generateIframeWidget(website: Website) {
  return `
    <iframe src="/${
      website.id
    }/widget" width="470" height="90" frameBorder="0" sandbox="allow-top-navigation allow-scripts allow-forms">
      ${generateTextWidget(website)}
    </iframe>
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
      return generateImageWidget(website);
    case WidgetType.Iframe:
      return generateIframeWidget(website);
    case WidgetType.BannerExchange:
    default:
      return generateBannerExchasngeWidget(website);
  }
}
