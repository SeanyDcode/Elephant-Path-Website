// Practice details used across the site. Change a value here and it
// updates everywhere. Anything set to null shows a [TO CONFIRM] marker.

export const site = {
  name: 'The Elephant Path',
  legalName: 'The Elephant Path, PLLC',
  headline: 'Simple. Accessible. Individualized care.',

  clinician: 'Sandra Dougherty, LMSW',
  licenseNumber: '6801089986',

  phoneDisplay: '(248) 795-5517',
  phoneHref: 'tel:+12487955517',

  // Practice email. The owner may move to Google Workspace (with a BAA)
  // before launch, so this is the one place to change it.
  email: 'sdoughertylmsw@proton.me' as string | null,

  area: 'Telehealth for clients anywhere in Michigan',

  links: {
    clientPortal: 'https://www.therapyportal.com/p/sandradougherty/',
    psychologyToday:
      'https://www.psychologytoday.com/us/therapists/sandra-dougherty-clarkston-mi/1849683',
    noSurprises: 'https://www.cms.gov/nosurprises',
    // Only set this if the owner wants the Doxy.me room link shown on the site.
    doxyMeRoom: null as string | null,
  },
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Services & Fees', href: '/services/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Library', href: '/library/' },
];

export const fees = [
  { session: '15-minute phone consultation', fee: 'Free', highlight: true },
  { session: '60-minute initial assessment', fee: '$140' },
  { session: '60-minute session', fee: '$130' },
  { session: '45-minute session', fee: '$100' },
  { session: '30-minute session', fee: '$70' },
];

export const paymentCards = ['Visa', 'Mastercard', 'American Express', 'Discover', 'HSA cards'];

// "I also support…" list on Services (from the Psychology Today profile).
export const alsoSupport = [
  'Cancer',
  'Chronic pain',
  'Coping skills',
  'Stress',
  'Divorce',
  'First responders',
  'Older adults',
  'Anxiety',
];

// The seven focus areas. `id` is the anchor on the Services page and the
// category name used by the blog and library.
export const focusAreas = [
  {
    id: 'grief-and-loss',
    title: 'Grief and loss',
    blurb:
      'Support after the death of someone you love, and after losses that don’t involve a death, such as a divorce, a move, or a change in health.',
    description:
      'Grief can follow the death of someone you love. It can also follow losses that don’t involve a death: a divorce, a move, a job, a friendship, or the health and future you expected. Every loss is real, and there is no right way or timeline to grieve. I offer a steady, caring place to be with what you’re feeling and to find your way forward.',
  },
  {
    id: 'chronic-and-terminal-illness',
    title: 'Chronic and terminal illness',
    blurb:
      'Room to talk through a diagnosis, treatment and the ways illness changes daily life, for you and for the people close to you.',
    description:
      'A diagnosis can change your plans, your body, your relationships, and how you see yourself. Whether you are living with an ongoing condition or a terminal illness, I can help you talk through what is happening and cope with treatment and uncertainty.',
  },
  {
    id: 'life-limiting-illness',
    title: 'Life-limiting illness',
    blurb:
      'Ongoing support for living with a serious diagnosis over months or years, not only at the end of life.',
    description:
      'Some illnesses shorten life but are lived with over months or years. This kind of diagnosis brings its own questions: how to plan, how to keep living fully, and how to hold hope and hard news at the same time. I offer ongoing support for the whole journey, not only its final stage.',
  },
  {
    id: 'end-of-life',
    title: 'End-of-life care',
    blurb:
      'Gentle support for people nearing the end of life, and for the families who are with them.',
    description:
      'Nearing the end of life can bring fear, reflection, unfinished business, and moments of deep connection. I offer gentle support to people facing the end of life and to the families who are with them, drawing on my years of work in hospice.',
  },
  {
    id: 'caregiver-support',
    title: 'Caregiver support',
    blurb:
      'A place for primary caregivers to be heard, rest for a moment and find steadier footing while caring for someone else.',
    description:
      'Caring for someone you love can be meaningful and exhausting at the same time. Primary caregivers often put their own needs last. Our sessions are a place where you come first: to be heard, to sort through hard feelings like guilt or grief, and to find ways to care for yourself, too.',
  },
  {
    id: 'parenting',
    title: 'Parenting',
    blurb: 'Support with the everyday moments, and the harder ones, of raising children and teens.',
    description:
      'Parenting asks a lot of us, especially during stressful seasons like illness, loss, divorce, or big changes at home. I can help you think through challenges, strengthen your connection with your children and teens, and care for yourself as a parent.',
  },
  {
    id: 'life-transitions',
    title: 'Life transitions',
    blurb: 'Help finding your way through change, whether you chose it or not.',
    description:
      'Change is part of life, but it can still be unsettling, even when it’s a change you chose. A new role, a move, retirement, an empty nest, or the end of a relationship can all shake your footing. Together we can make sense of the change and find your next steps.',
  },
];

export type FocusAreaId = (typeof focusAreas)[number]['id'];
export const focusAreaIds = focusAreas.map((a) => a.id) as [string, ...string[]];
export const focusAreaTitle = (id: string) => focusAreas.find((a) => a.id === id)?.title ?? id;

// Crisis and support lines, checked September 2026. Re-check before launch.
// Each line's description is a list of pieces: plain text, or a number with
// the tel:/sms: link that makes it tap-to-call or tap-to-text.
type Piece = string | { text: string; href: string };

export const crisisLines: { name: string; href: string; how: Piece[] }[] = [
  {
    name: '988 Suicide & Crisis Lifeline',
    href: 'https://988lifeline.org/',
    how: [
      'Call or text ',
      { text: '988', href: 'tel:988' },
      ', or chat online. Free, confidential, and available 24/7.',
    ],
  },
  {
    name: 'Crisis Text Line',
    href: 'https://www.crisistextline.org/',
    how: [
      'Text HOME to ',
      { text: '741741', href: 'sms:741741' },
      ' to reach a trained crisis counselor, 24/7.',
    ],
  },
  {
    name: 'The Trevor Project',
    href: 'https://www.thetrevorproject.org/get-help/',
    how: [
      'For LGBTQ+ young people under 25. Call ',
      { text: '1-866-488-7386', href: 'tel:+18664887386' },
      ' or text START to ',
      { text: '678-678', href: 'sms:678678' },
      ', 24/7.',
    ],
  },
  {
    name: 'Oakland Community Health Network (OCHN)',
    href: 'https://oaklandchn.org/',
    how: [
      'For adults in Oakland County. Call ',
      { text: '1-888-238-0611', href: 'tel:+18882380611' },
      ' or walk in to the Resource and Crisis Center in Pontiac, 24/7.',
    ],
  },
];
