export const LOCALES = [
  'en',
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
] as const

export const MODE = {
  PRODUCTION: 'prod',
  DEVELOPMENT: 'dev',
  SANDBOX: 'sandbox',
} as const

export type MODE = typeof MODE

export const URLS = {
  [MODE.SANDBOX]: 'https://sandbox-merchant.revolut.com/embed.js',
  [MODE.PRODUCTION]: 'https://merchant.revolut.com/embed.js',
  [MODE.DEVELOPMENT]: 'https://merchant.revolut.codes/embed.js',
} as const

export type URLS = typeof URLS

export const REVOLUT_PAY_ORDER_ID_URL_PARAMETER = '_rp_oid'
export const REVOLUT_PAY_SUCCESS_REDIRECT_URL_PARAMETER = '_rp_s'
export const REVOLUT_PAY_FAILURE_REDIRECT_URL_PARAMETER = '_rp_fr'
