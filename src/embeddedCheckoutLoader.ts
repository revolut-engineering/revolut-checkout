import { MODE } from './constants'
import {
  EmbeddedCheckoutInstance,
  EmbeddedCheckoutOptions,
  Mode,
  RevolutCheckout,
} from './types'
import { RevolutPaymentsVersionLoader } from './versionLoader'
import { loadRevolutCheckout } from './loader'

let loadedEmbeddedCheckoutInstance: RevolutCheckout['embeddedCheckout'] = null

type Props = {
  mode: Mode
} & EmbeddedCheckoutOptions

export function RevolutEmbeddedCheckoutLoader({
  mode = RevolutEmbeddedCheckoutLoader.mode,
  ...props
}: Props): Promise<EmbeddedCheckoutInstance> {
  if (loadedEmbeddedCheckoutInstance) {
    const instance = loadedEmbeddedCheckoutInstance(props)
    return Promise.resolve(instance)
  }

  return RevolutPaymentsVersionLoader(mode)
    .then((version) => loadRevolutCheckout(version, mode, 'EmbeddedCheckout'))
    .then((revolutCheckout) => {
      loadedEmbeddedCheckoutInstance = revolutCheckout.embeddedCheckout

      return revolutCheckout.embeddedCheckout(props)
    })
}

RevolutEmbeddedCheckoutLoader.mode = MODE.PRODUCTION
