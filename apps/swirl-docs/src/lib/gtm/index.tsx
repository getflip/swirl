export const GTM_ID = "GTM-TNKB82Q";

declare global {
  interface Window {
    dataLayer: Record<string, any>;
  }
}

export const isProd = process.env.NODE_ENV === "production";
export const pageview = (url: any) => {
  if (isProd) {
    window.dataLayer.push({
      event: "pageview",
      page: url,
    });
  }
};
