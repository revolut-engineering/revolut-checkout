import { MODE } from './constants'
import {
  Locale,
  Mode,
  RevolutCheckout,
  RevolutPaymentsModuleInstance,
} from './types'
import { RevolutPaymentsVersionLoader } from './versionLoader'
import { loadRevolutCheckout } from './loader'

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

  return RevolutPaymentsVersionLoader(mode)
    .then((version) => loadRevolutCheckout(version, mode, 'RevolutPayments'))
    .then((revolutCheckout) => {
      loadedPaymentInstance = revolutCheckout.payments

      return revolutCheckout.payments({ publicToken: token, locale })
    })
}

RevolutPaymentsLoader.mode = MODE.PRODUCTION
