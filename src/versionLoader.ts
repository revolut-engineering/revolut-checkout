import { MODE, URLS } from './constants'
import { Mode } from './types'
import { getVersionedUrl, loadModule } from './utils'

let loadedVersion: string = null

export function RevolutPaymentsVersionLoader(
  mode: Mode = RevolutPaymentsVersionLoader.mode
): Promise<string> {
  if (typeof loadedVersion === 'string') {
    return Promise.resolve(loadedVersion)
  }

  return loadModule({
    src: getVersionedUrl(URLS[mode].version, `${Date.now()}`),
    id: 'revolut-pay-version',
    name: 'RevolutPayVersion',
  })
    .then(() => {
      loadedVersion =
        '__REV_PAY_VERSION__' in window &&
        typeof __REV_PAY_VERSION__ === 'string'
          ? __REV_PAY_VERSION__
          : ''
      delete window.__REV_PAY_VERSION__

      return loadedVersion
    })
    .catch(() => {
      loadedVersion = ''
      return loadedVersion
    })
}

RevolutPaymentsVersionLoader.mode = MODE.PRODUCTION
