import { MODE, URLS } from './constants'
import {
  Mode,
  Locale,
  RevolutCheckout,
  RevolutPaymentsModuleInstance,
} from './types'
import { getVersionedUrl, loadScript } from './utils'
import { RevolutPaymentsVersionLoader } from './versionLoader'

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

  return RevolutPaymentsVersionLoader(mode).then((version) =>
    loadRevolutPayments(version, token, mode, locale)
  )
}

function loadRevolutPayments(
  version: string,
  token: string,
  mode: Mode,
  locale: Locale | 'auto'
): Promise<RevolutPaymentsModuleInstance> {
  return loadScript({
    src: getVersionedUrl(URLS[mode].embed, version),
    id: 'revolut-payments',
    name: 'RevolutPayments',
  }).then((scriptElement) => {
    if (loadedPaymentInstance) {
      return loadedPaymentInstance({ publicToken: token, locale })
    } else if (typeof RevolutCheckout === 'function') {
      loadedPaymentInstance = RevolutCheckout.payments
      delete window.RevolutCheckout

      return loadedPaymentInstance({ publicToken: token, locale })
    } else {
      document.head.removeChild(scriptElement)
      throw new Error(
        `'RevolutPayments' failed to load: RevolutCheckout is not a function`
      )
    }
  })
}

RevolutPaymentsLoader.mode = MODE.PRODUCTION
