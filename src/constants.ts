export const LOCALES = [
  'en',
  'en-US',
  'nl',
  'fr',
  'de',
  'cs',
  'it',
  'lt',
  'pl',
  'pt',
  'es',
  'hu',
  'sk',
  'ja',
  'sv',
  'bg',
  'ro',
  'ru',
  'el',
  'hr',
  'tr',
] as const

export const MODE = {
  PRODUCTION: 'prod',
  DEVELOPMENT: 'dev',
  SANDBOX: 'sandbox',
} as const

export type MODE = typeof MODE

type UrlsMap = Readonly<
  Record<
    MODE[keyof typeof MODE],
    Readonly<{ embed: string; version: string; upsell: string }>
  >
>

export const URLS: UrlsMap = {
  [MODE.SANDBOX]: {
    embed: 'https://sandbox-merchant.revolut.com/embed.js',
    version: 'https://sandbox-merchant.revolut.com/version.js',
    upsell: 'https://sandbox-merchant.revolut.com/upsell/embed.js',
  },
  [MODE.PRODUCTION]: {
    embed: 'https://merchant.revolut.com/embed.js',
    version: 'https://merchant.revolut.com/version.js',
    upsell: 'https://merchant.revolut.com/upsell/embed.js',
  },
  [MODE.DEVELOPMENT]: {
    embed: 'https://merchant.revolut.codes/embed.js',
    version: 'https://merchant.revolut.codes/version.js',
    upsell: 'https://merchant.revolut.codes/upsell/embed.js',
  },
}

export const REVOLUT_PAY_ORDER_ID_URL_PARAMETER = '_rp_oid'
export const REVOLUT_PAY_SUCCESS_REDIRECT_URL_PARAMETER = '_rp_s'
export const REVOLUT_PAY_FAILURE_REDIRECT_URL_PARAMETER = '_rp_fr'
