export type Website = {
  id: string;
  name: string;
  url: string;
  banner?: string;
  description: string;
};

export enum WidgetType {
  Image = "image",
  Text = "text",
  Iframe = "iframe",
  BannerExchange = "banner exchange",
}

export type WidgetCreationRequest = {
  websiteId: string;
  widgetType: WidgetType;
};
