import { MODE, URLS } from './constants'
import {
  Mode,
  Locale,
  RevolutCheckout,
  RevolutPaymentsModuleInstance,
} from './types'

let loadedPaymentInstance: RevolutCheckout['payments'] = null

export function RevolutPaymentsLoader(
  token: string,
  mode: Mode = RevolutPaymentsLoader.mode,
  locale?: Locale | 'auto'
): Promise<RevolutPaymentsModuleInstance> {
  if (loadedPaymentInstance) {
    const instance = loadedPaymentInstance({ publicToken: token, locale })
    return Promise.resolve(instance)
  }

  const script = document.createElement('script')

  script.id = 'revolut-payments'
  script.src = URLS[mode]
  script.async = true

  document.head.appendChild(script)

  return new Promise((resolve, reject) => {
    function handleError() {
      document.head.removeChild(script)

      reject(new Error(`'RevolutPayments' failed to load`))
    }

    function handleLoad() {
      if (typeof RevolutCheckout === 'function') {
        resolve(RevolutCheckout.payments({ publicToken: token, locale }))

        loadedPaymentInstance = RevolutCheckout.payments
        delete window.RevolutCheckout
      } else {
        handleError()
      }
    }

    script.onload = handleLoad
    script.onerror = handleError
  })
}

RevolutPaymentsLoader.mode = MODE.PRODUCTION
