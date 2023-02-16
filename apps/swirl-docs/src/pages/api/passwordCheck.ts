import { passwordCheckHandler } from "next-password-protect";

export default passwordCheckHandler(process.env.SITE_PASSWORD!!, {
  // Options go here (optional)
  cookieName: "next-password-protect",
});
