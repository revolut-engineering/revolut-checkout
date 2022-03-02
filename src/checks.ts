import { ValidationError, RevolutCheckoutError, Locale } from './types'

import { LOCALES } from './constants'

export function isValidationError(error?: Error): error is ValidationError {
  return error != null && error.name === 'Validation'
}

export function isRevolutCheckoutError(
  error?: Error
): error is RevolutCheckoutError {
  return error != null && error.name === 'RevolutCheckout'
}

export function isValidLocale(locale: unknown): locale is Locale {
  return locale && LOCALES.some((value) => value === locale)
}
