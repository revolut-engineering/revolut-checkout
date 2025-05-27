import { MODE, URLS } from './constants'
import {
  Locale,
  Mode,
  RevolutCheckout,
  RevolutUpsellModuleInstance,
} from './types'
import { getVersionedUrl, loadScript } from './utils'
import { RevolutPaymentsVersionLoader } from './versionLoader'

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

  return RevolutPaymentsVersionLoader(mode)
    .then((version) => loadRevolutUpsell(version, mode))
    .then((revolutUpsell) => revolutUpsell({ publicToken: token, locale }))
}

function loadRevolutUpsell(version: string, mode: Mode) {
  return loadScript({
    src: getVersionedUrl(URLS[mode].upsell, version),
    id: 'revolut-upsell',
    name: 'RevolutUpsell',
  }).then(() => {
    if (loadedUpsellInstance) {
      return loadedUpsellInstance
    } else if (typeof RevolutUpsell === 'function') {
      loadedUpsellInstance = RevolutUpsell
      delete window.RevolutUpsell

      return loadedUpsellInstance
    } else {
      throw new Error(
        `'RevolutUpsell' failed to load: RevolutUpsell is not a function`
      )
    }
  })
}

RevolutUpsellLoader.mode = MODE.PRODUCTION
