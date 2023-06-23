import { MODE, UPSELL_URLS } from './constants'
import {
  Locale,
  Mode,
  RevolutCheckout,
  RevolutUpsellModuleInstance,
} from './types'
import { loadModule } from './utils'

let loadedUpsellInstance: RevolutCheckout['upsell'] = null

export function RevolutUpsellLoader(
  token: string,
  mode: Mode = RevolutUpsellLoader.mode,
  locale?: Locale | 'auto'
): Promise<RevolutUpsellModuleInstance> {
  if (loadedUpsellInstance) {
    const instance = loadedUpsellInstance({ publicToken: token, locale })
    return Promise.resolve(instance)
  }

  return loadModule({
    src: UPSELL_URLS[mode],
    id: 'revolut-upsell',
    name: 'RevolutUpsell',
  }).then((scriptElement) => {
    if (typeof RevolutUpsell === 'function') {
      loadedUpsellInstance = RevolutUpsell
      delete window.RevolutUpsell

      return loadedUpsellInstance({ publicToken: token, locale })
    } else {
      document.head.removeChild(scriptElement)
      throw new Error(
        `'RevolutUpsell' failed to load: RevolutUpsell is not a function`
      )
    }
  })
}

RevolutUpsellLoader.mode = MODE.PRODUCTION
