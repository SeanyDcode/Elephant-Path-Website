// Practice details used across the site. Change a value here and it
// updates everywhere. Anything set to null shows a [TO CONFIRM] marker.

export const site = {
  name: 'The Elephant Path',
  legalName: 'The Elephant Path, PLLC',
  tagline: 'Mental wellness for the modern world.',
  supportingLine: 'Simple. Accessible. Individualized care.',

  clinician: 'Sandra Dougherty, LMSW',
  licenseNumber: '6801089986',

  phoneDisplay: '(248) 831-0523',
  phoneHref: 'tel:+12488310523',

  // Practice email. The owner may move to Google Workspace (with a BAA)
  // before launch, so this is the one place to change it.
  email: null as string | null,

  hours: 'Monday through Thursday, 9am to 5pm',
  area: 'Telehealth for clients anywhere in Michigan',

  links: {
    clientPortal: 'https://www.therapyportal.com/p/sandradougherty/',
    psychologyToday:
      'https://www.psychologytoday.com/us/therapists/sandra-dougherty-clarkston-mi/1849683',
    googleBusinessProfile: null as string | null,
    noSurprises: 'https://www.cms.gov/nosurprises',
  },
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Services & Fees', href: '/services/' },
  { label: 'Resources', href: '/resources/' },
  { label: 'Contact', href: '/contact/' },
];

// The seven focus areas. Used on Home now, and on Services and
// Resources in Phase 2. `id` becomes the anchor on those pages.
export const focusAreas = [
  {
    id: 'grief-and-loss',
    title: 'Grief and loss',
    blurb:
      'Support after the death of someone you love, and after losses that don’t involve a death, such as a divorce, a move or a change in health.',
  },
  {
    id: 'chronic-and-terminal-illness',
    title: 'Chronic and terminal illness',
    blurb:
      'Room to talk through a diagnosis, treatment and the ways illness changes daily life, for you and for the people close to you.',
  },
  {
    id: 'life-limiting-disease',
    title: 'Life-limiting disease',
    blurb:
      'Ongoing support for living with a serious diagnosis over months or years, not only at the end of life.',
    toConfirm: true,
  },
  {
    id: 'end-of-life',
    title: 'End-of-life care',
    blurb:
      'Gentle support for people nearing the end of life, and for the families who are with them.',
  },
  {
    id: 'caregiver-support',
    title: 'Caregiver support',
    blurb:
      'A place for primary caregivers to be heard, rest for a moment and find steadier footing while caring for someone else.',
  },
  {
    id: 'parenting',
    title: 'Parenting',
    blurb: 'Support with the everyday moments, and the harder ones, of raising children and teens.',
  },
  {
    id: 'life-transitions',
    title: 'Life transitions',
    blurb: 'Help finding your way through change, whether you chose it or not.',
  },
];
