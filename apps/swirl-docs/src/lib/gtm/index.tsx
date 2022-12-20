export const GTM_ID = "GTM-TNKB82Q";

declare global {
  interface Window {
    dataLayer: Record<string, any>;
  }
}

export const pageview = (url: any) => {
  const isProd = process.env.NODE_ENV === "production";

  if (isProd) {
    window.dataLayer.push({
      event: "pageview",
      page: url,
    });
  }
};
