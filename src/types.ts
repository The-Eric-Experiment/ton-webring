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
}

export type WidgetCreationRequest = {
  websiteId: string;
  widgetType: WidgetType;
};
