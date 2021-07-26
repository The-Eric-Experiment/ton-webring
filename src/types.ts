export type Website = {
  id: string;
  name: string;
  url: string;
  banner?: string;
  description: string;
};

export type WidgetCreationRequest = {
  websiteId: string;
};
