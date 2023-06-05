import { MODE, URLS } from './constants'
import { RevolutPaymentsLoader } from './paymentsLoader'
import { RevolutCheckout, RevolutCheckoutInstance, Mode, Locale } from './types'
import { loadModule } from './utils'

let loaded: RevolutCheckout = null

/**
 * Load [`RevolutCheckout.js`](https://developer.revolut.com/docs/revolut-checkout-js/#revolutcheckout)
 * and create [`Instance`](https://developer.revolut.com/docs/revolut-checkout-js/#instance) for the order `token`.
 *
 * @param token `public_id`  from [create payment order](https://developer.revolut.com/api-reference/merchant/#operation/createOrder) API request
 * @param mode [API](https://developer.revolut.com/docs/revolut-checkout-js/#revolutcheckout-parameters) environment, defaults to `'prod'`
 *
 * @see [`RevolutCheckout.js` reference](https://developer.revolut.com/docs/revolut-checkout-js)
 *
 * @example
 * ```js
 * RevolutCheckout('TOKEN_XXX', 'prod').then(function(instance) {
 *   // Work with instance
 * });
 * ```
 */
export function RevolutCheckoutLoader(
  token: string,
  mode: Mode = RevolutCheckoutLoader.mode
): Promise<RevolutCheckoutInstance> {
  if (loaded) {
    return loaded(token)
  }

  return loadModule({
    url: URLS[mode],
    id: 'revolut-checkout',
    name: 'RevolutCheckout',
  }).then((scriptElement) => {
    if (typeof RevolutCheckout === 'function') {
      loaded = RevolutCheckout
      delete window.RevolutCheckout

      return loaded(token)
    } else {
      document.head.removeChild(scriptElement)
      throw new Error(
        `'RevolutCheckout' failed to load: RevolutCheckout is not a function`
      )
    }
  })
}

RevolutCheckoutLoader.mode = MODE.PRODUCTION

type PaymentModuleParams = {
  locale: Locale | 'auto'
  publicToken: string
  mode?: Mode
}
RevolutCheckoutLoader.payments = ({
  locale,
  publicToken,
  mode = RevolutCheckoutLoader.mode,
}: PaymentModuleParams) => RevolutPaymentsLoader(publicToken, mode, locale)
