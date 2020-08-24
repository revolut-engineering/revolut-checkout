import { ValidationError, RevolutCheckoutError } from './types'

export function isValidationError(error?: Error): error is ValidationError {
  return error != null && error.name === 'Validation'
}

export function isRevolutCheckoutError(
  error?: Error
): error is RevolutCheckoutError {
  return error != null && error.name === 'RevolutCheckout'
}
