import {
  ValidationError,
  RevolutCheckoutError,
  RevolutCheckoutLocale,
} from './types'

import { LOCALES } from './constants'

export function isValidationError(error?: Error): error is ValidationError {
  return error != null && error.name === 'Validation'
}

export function isRevolutCheckoutError(
  error?: Error
): error is RevolutCheckoutError {
  return error != null && error.name === 'RevolutCheckout'
}

export function isValidRevolutCheckoutLocale(
  locale: any
): locale is RevolutCheckoutLocale {
  return locale && LOCALES.includes(locale)
}
