export const GTM_ID = "GTM-TNKB82Q";

// here to get rid of misleading typescript errors
declare const window: any;

export const pageview = (url: any) => {
  window.dataLayer.push({
    event: "pageview",
    page: url,
  });
};
