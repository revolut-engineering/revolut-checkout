import { MODE, URLS } from './constants'
import { RevolutCheckout, RevolutCheckoutInstance, Mode } from './types'

let loaded: RevolutCheckout = null

/**
 * Load [`RevolutCheckout.js`](https://developer.revolut.com/docs/merchant-api/#revolutcheckout-js-reference-revolutcheckout)
 * and create [`Instance`](https://developer.revolut.com/docs/merchant-api/#revolutcheckout-js-reference-instance) for the order `token`.
 *
 * @param token `public_id`  from [create payment order](https://developer.revolut.com/docs/merchant-api/#api-api-order-object-create-payment-order) request on BE
 * @param mode BE environment
 *
 * @see [`RevolutCheckout.js` reference](https://developer.revolut.com/docs/merchant-api/#revolutcheckout-js-reference-revolutcheckout)
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
) {
  if (loaded) {
    return loaded(token)
  }

  const script = document.createElement('script')

  script.id = 'revolut-checkout'
  script.src = URLS[mode]
  script.async = true

  document.head.appendChild(script)

  return new Promise<RevolutCheckoutInstance>((resolve, reject) => {
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
