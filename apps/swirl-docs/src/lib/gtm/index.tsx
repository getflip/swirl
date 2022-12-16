export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

// here to get rid of misleading typescript errors
declare const window: any;

export const pageview = (url: any) => {
  window.dataLayer.push({
    event: "pageview",
    page: url,
  });
};
