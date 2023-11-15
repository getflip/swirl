import { loginHandler } from "next-password-protect";

export default loginHandler(process.env.SITE_PASSWORD!!, {
  cookieName: "next-password-protect",
});
