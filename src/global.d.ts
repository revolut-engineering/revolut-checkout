import { RevolutCheckout } from './types'

declare global {
  var RevolutCheckout: RevolutCheckout | undefined
  var RevolutUpsell: RevolutCheckout['upsell'] | undefined
}
