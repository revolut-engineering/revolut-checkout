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
