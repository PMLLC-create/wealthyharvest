import { SITE_URL } from "./env";

export const SITE_NAME = "Wealthy Harvest";
export const DEFAULT_TITLE = "Wealthy Harvest™ | Building Abundant Lives";
export const DEFAULT_DESCRIPTION =
  "Wealthy Harvest™ helps people build abundant, prepared, purposeful lives through wellness, provision, and preparedness resources — wellness, provision, preparedness, purpose.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
