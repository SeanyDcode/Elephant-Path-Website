// The launch switch, shared by astro.config.mjs and the accessibility test.
//
// While the site is a prototype it lives at
// https://seanydcode.github.io/Elephant-Path-Website/
// At launch, set CUSTOM_DOMAIN_LIVE to true. That switches the address to
// https://walktheelephantpath.com and removes the temporary base path.
export const CUSTOM_DOMAIN_LIVE = true;

export const SITE = CUSTOM_DOMAIN_LIVE
  ? 'https://walktheelephantpath.com'
  : 'https://seanydcode.github.io';

// Path prefix every page lives under: '' at launch, '/Elephant-Path-Website' before.
export const BASE_PATH = CUSTOM_DOMAIN_LIVE ? '' : '/Elephant-Path-Website';
