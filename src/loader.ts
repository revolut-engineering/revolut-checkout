import { MODE, URLS } from './constants'
import { RevolutPaymentsLoader } from './paymentsLoader'
import { RevolutCheckout, RevolutCheckoutInstance, Mode, Locale } from './types'

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

  const script = document.createElement('script')

  script.id = 'revolut-checkout'
  script.src = URLS[mode]
  script.async = true

  document.head.appendChild(script)

  return new Promise((resolve, reject) => {
    function handleError() {
      document.head.removeChild(script)

      reject(new Error(`'RevolutCheckout' is failed to load`))
    }

    function handleLoad() {
      if (typeof RevolutCheckout === 'function') {
        resolve(RevolutCheckout(token))

        loaded = RevolutCheckout
        delete window.RevolutCheckout
      } else {
        handleError()
      }
    }

    script.onload = handleLoad
    script.onerror = handleError
  })
}

RevolutCheckoutLoader.mode = MODE.PRODUCTION

type PaymentModuleParams = {
  locale: Locale
  publicToken: string
  mode?: Mode
}
RevolutCheckoutLoader.payments = ({
  locale,
  publicToken,
  mode = RevolutCheckoutLoader.mode,
}: PaymentModuleParams) => RevolutPaymentsLoader(publicToken, mode, locale)
