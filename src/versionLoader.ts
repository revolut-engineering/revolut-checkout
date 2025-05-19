import { MODE, URLS } from './constants'
import { Mode } from './types'
import { getVersionedUrl, loadScript } from './utils'

let loadedVersion: string = null
let pendingTimestamp: number | null = null

export function RevolutPaymentsVersionLoader(
  mode: Mode = RevolutPaymentsVersionLoader.mode
): Promise<string> {
  if (typeof loadedVersion === 'string') {
    return Promise.resolve(loadedVersion)
  }

  pendingTimestamp = pendingTimestamp ?? Date.now()
  return loadScript({
    src: getVersionedUrl(URLS[mode].version, `${pendingTimestamp}`),
    id: 'revolut-pay-version',
    name: 'RevolutPayVersion',
  })
    .then(() => {
      pendingTimestamp = null

      if (typeof loadedVersion !== 'string' || !loadedVersion) {
        loadedVersion =
          '__REV_PAY_VERSION__' in window &&
          typeof __REV_PAY_VERSION__ === 'string'
            ? __REV_PAY_VERSION__
            : ''
        delete window.__REV_PAY_VERSION__
      }

      return loadedVersion
    })
    .catch(() => {
      pendingTimestamp = null
      loadedVersion = ''
      return loadedVersion
    })
}

RevolutPaymentsVersionLoader.mode = MODE.PRODUCTION
