import { nanoid } from "nanoid";
import crypto from "crypto";

export const generateCsp = (): string => {
  const hash = crypto.createHash("sha256");
  hash.update(nanoid());
  const production = process.env.NODE_ENV === "production";

  return `default-src 'self'; style-src https://fonts.googleapis.com 'self' 'unsafe-inline'; script-src 'sha256-${hash.digest(
    "base64"
  )}' 'self' 'unsafe-inline' ${
    production ? "" : "'unsafe-eval'"
  }; font-src https://fonts.gstatic.com 'self' data:; img-src https://lh3.googleusercontent.com https://res.cloudinary.com https://s.gravatar.com 'self' data:;`;
};

export default generateCsp;
