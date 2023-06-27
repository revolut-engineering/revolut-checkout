import { RevolutCheckout } from './types'

declare global {
  var RevolutCheckout: RevolutCheckout | undefined
  var RevolutUpsell: RevolutCheckout['upsell'] | undefined
  var __REV_PAY_VERSION__: string | undefined
}
