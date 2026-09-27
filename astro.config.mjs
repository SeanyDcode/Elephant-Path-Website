// @ts-check
import { defineConfig } from 'astro/config';

// While the site is a prototype it lives at
// https://seanydcode.github.io/Elephant-Path-Website/
// At launch (Phase 6), set CUSTOM_DOMAIN_LIVE to true. That switches the
// address to https://walktheelephantpath.com and removes the temporary base path.
const CUSTOM_DOMAIN_LIVE = false;

export default defineConfig({
  site: CUSTOM_DOMAIN_LIVE ? 'https://walktheelephantpath.com' : 'https://seanydcode.github.io',
  base: CUSTOM_DOMAIN_LIVE ? '/' : '/Elephant-Path-Website',
  trailingSlash: 'ignore',
});
