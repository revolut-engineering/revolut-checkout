import { MODE, LOCALES } from './constants'

export type Mode = MODE[keyof MODE]

export type CountryCode =
  | 'BD'
  | 'BE'
  | 'BF'
  | 'BG'
  | 'BA'
  | 'BB'
  | 'WF'
  | 'BL'
  | 'BM'
  | 'BN'
  | 'BO'
  | 'BH'
  | 'BI'
  | 'BJ'
  | 'BT'
  | 'JM'
  | 'BV'
  | 'BW'
  | 'WS'
  | 'BQ'
  | 'BR'
  | 'BS'
  | 'JE'
  | 'BY'
  | 'BZ'
  | 'RU'
  | 'RW'
  | 'RS'
  | 'TL'
  | 'RE'
  | 'TM'
  | 'TJ'
  | 'RO'
  | 'TK'
  | 'GW'
  | 'GU'
  | 'GT'
  | 'GS'
  | 'GR'
  | 'GQ'
  | 'GP'
  | 'JP'
  | 'GY'
  | 'GG'
  | 'GF'
  | 'GE'
  | 'GD'
  | 'GB'
  | 'GA'
  | 'SV'
  | 'GN'
  | 'GM'
  | 'GL'
  | 'GI'
  | 'GH'
  | 'OM'
  | 'TN'
  | 'JO'
  | 'HR'
  | 'HT'
  | 'HU'
  | 'HK'
  | 'HN'
  | 'HM'
  | 'VE'
  | 'PR'
  | 'PS'
  | 'PW'
  | 'PT'
  | 'SJ'
  | 'PY'
  | 'IC'
  | 'IQ'
  | 'PA'
  | 'PF'
  | 'PG'
  | 'PE'
  | 'PK'
  | 'PH'
  | 'PN'
  | 'PL'
  | 'PM'
  | 'ZM'
  | 'EH'
  | 'EE'
  | 'EG'
  | 'ZA'
  | 'EC'
  | 'IT'
  | 'VN'
  | 'SB'
  | 'ET'
  | 'SO'
  | 'ZW'
  | 'SA'
  | 'ES'
  | 'ER'
  | 'ME'
  | 'MD'
  | 'MG'
  | 'MF'
  | 'MA'
  | 'MC'
  | 'UZ'
  | 'MM'
  | 'ML'
  | 'MO'
  | 'MN'
  | 'MH'
  | 'MK'
  | 'MU'
  | 'MT'
  | 'MW'
  | 'MV'
  | 'MQ'
  | 'MP'
  | 'MS'
  | 'MR'
  | 'IM'
  | 'UG'
  | 'TZ'
  | 'MY'
  | 'MX'
  | 'IL'
  | 'FR'
  | 'IO'
  | 'SH'
  | 'FI'
  | 'FJ'
  | 'FK'
  | 'FM'
  | 'FO'
  | 'NI'
  | 'NL'
  | 'NO'
  | 'NA'
  | 'VU'
  | 'NC'
  | 'NE'
  | 'NF'
  | 'NG'
  | 'NZ'
  | 'NP'
  | 'NR'
  | 'NU'
  | 'CK'
  | 'XK'
  | 'CI'
  | 'CH'
  | 'CO'
  | 'CN'
  | 'CM'
  | 'CL'
  | 'CC'
  | 'CA'
  | 'CG'
  | 'CF'
  | 'CD'
  | 'CZ'
  | 'CY'
  | 'CX'
  | 'CR'
  | 'CW'
  | 'CV'
  | 'CU'
  | 'SZ'
  | 'SY'
  | 'SX'
  | 'KG'
  | 'KE'
  | 'SS'
  | 'SR'
  | 'KI'
  | 'KH'
  | 'KN'
  | 'KM'
  | 'ST'
  | 'SK'
  | 'KR'
  | 'SI'
  | 'KP'
  | 'KW'
  | 'SN'
  | 'SM'
  | 'SL'
  | 'SC'
  | 'KZ'
  | 'KY'
  | 'SG'
  | 'SE'
  | 'SD'
  | 'DO'
  | 'DM'
  | 'DJ'
  | 'DK'
  | 'VG'
  | 'DE'
  | 'YE'
  | 'DZ'
  | 'US'
  | 'UY'
  | 'YT'
  | 'UM'
  | 'LB'
  | 'LC'
  | 'LA'
  | 'TV'
  | 'TW'
  | 'TT'
  | 'TR'
  | 'LK'
  | 'LI'
  | 'LV'
  | 'TO'
  | 'LT'
  | 'LU'
  | 'LR'
  | 'LS'
  | 'TH'
  | 'TF'
  | 'TG'
  | 'TD'
  | 'TC'
  | 'LY'
  | 'VA'
  | 'VC'
  | 'AE'
  | 'AD'
  | 'AG'
  | 'AF'
  | 'AI'
  | 'VI'
  | 'IS'
  | 'IR'
  | 'AM'
  | 'AL'
  | 'AO'
  | 'AS'
  | 'AR'
  | 'AU'
  | 'AT'
  | 'AW'
  | 'IN'
  | 'AX'
  | 'AZ'
  | 'IE'
  | 'ID'
  | 'UA'
  | 'QA'
  | 'MZ'

export type Locale = typeof LOCALES[number]

export type ValidationErrorType =
  | 'validation.card.number.incomplete'
  | 'validation.card.number.invalid'
  | 'validation.card.number.required'
  | 'validation.card.expiry.expired'
  | 'validation.card.expiry.incomplete'
  | 'validation.card.expiry.required'
  | 'validation.card.cvv.invalid'
  | 'validation.card.cvv.required'
  | 'validation.card.type.invalid'
  | 'validation.postcode.invalid'
  | 'validation.postcode.country-invalid'
  | 'validation.postcode.required'
  | 'validation.email.incomplete'
  | 'validation.email.invalid'
  | 'validation.email.required'
  | 'validation.phone.code.required'
  | 'validation.phone.number.invalid'
  | 'validation.phone.number.required'

export type RevolutCheckoutErrorType =
  | 'error.unknown'
  | 'error.unauthenticated-access'
  | 'error.order-not-found'
  | 'error.transaction-invalid-state'
  | 'error.declined'
  | 'error.token-not-found'
  | 'error.email-is-not-specified'
  | 'error.order-already-completed'
  | 'error.deactivated-merchant'
  | 'error.invalid-postcode'
  | 'error.invalid-email'
  | 'error.invalid-name'
  | 'error.invalid-address'
  | 'error.do-not-honour'
  | 'error.insufficient-funds'
  | 'error.3ds-failed'
  | 'error.expired-card'
  | 'error.incorrect-cvv-code'
  | 'error.order-is-cancelled'
  | 'error.trusted-principal-not-specified'
  | 'error.merchant-not-specified'
  | 'error.invalid-order-type'
  | 'error.transaction-step'
  | 'error.payment-method-already-exists'
  | 'error.payment-method-not-found'
  | 'error.order-customer-id-is-not-set'
  | 'error.payment-method-not-permitted-for-merchant'
  | 'error.webhook-not-found'
  | 'error.verification-not-permitted'
  | 'error.customer-already-exists'
  | 'error.unknown-authorisation'
  | 'error.submerchant-not-found'
  | 'error.submerchant-incorrect-notification'
  | 'error.3ds-incorrect-notification'
  | 'error.authentication-challenge-not-found'
  | 'error.mpi-provider'
  | 'error.payment-gateway'
  | 'error.invalid-provider-response'
  | 'error.unexpected-mpi-provider'
  | 'error.terminal-not-found'
  | 'error.submerchant-not-onboarded'

export interface ValidationError extends Error {
  name: 'Validation'
  type: ValidationErrorType
}

export interface RevolutCheckoutError extends Error {
  name: 'RevolutCheckout'
  type: RevolutCheckoutErrorType
  code?: number
}

export type StatusType =
  | 'default'
  | 'focused'
  | 'invalid'
  | 'empty'
  | 'autofilled'
  | 'completed'

export type StatusRecord<T> = Record<StatusType, T>

export type FieldStatus = Omit<StatusRecord<boolean>, 'default'>
export type FieldStyles = Partial<StatusRecord<Partial<CSSStyleDeclaration>>>
export type FieldClasses = Partial<StatusRecord<string>>

type RevolutPayButtonCashbackCurrency =
  | 'AED'
  | 'AUD'
  | 'BGN'
  | 'CAD'
  | 'CHF'
  | 'CZK'
  | 'DKK'
  | 'EUR'
  | 'GBP'
  | 'HKD'
  | 'HUF'
  | 'ILS'
  | 'JPY'
  | 'MXN'
  | 'NOK'
  | 'NZD'
  | 'PLN'
  | 'QAR'
  | 'RON'
  | 'RUB'
  | 'SAR'
  | 'SEK'
  | 'SGD'
  | 'THB'
  | 'TRY'
  | 'USD'
  | 'ZAR'

type RevolutPayButtonStyleOptions = {
  cashback: boolean
  /** @deprecated */
  cashbackAmount?: 1000 | 2000
  cashbackCurrency: RevolutPayButtonCashbackCurrency
}

export type ButtonStyleOptions = {
  height?: string
  size?: 'large' | 'small'
  radius?: 'none' | 'small' | 'large' | 'round'
  variant?: 'dark' | 'light' | 'light-outlined'
  action?: 'donate' | 'pay' | 'subscribe' | 'buy'
} & Partial<RevolutPayButtonStyleOptions>

export type SubmitMeta = CustomerDetails &
  Pick<CommonOptions, 'savePaymentMethodFor'>

export interface Address {
  countryCode: CountryCode
  postcode: string
  region?: string
  city?: string
  streetLine1?: string
  streetLine2?: string
}

export interface CustomerDetails {
  /** Cardholder name in form of `'FirstName LastName'` */
  name?: string
  /** Customer's email */
  email?: string
  /** Customer's phone number if available */
  phone?: string
  /** Customer's date of birth. Currently used only in Revolut Pay. */
  dateOfBirth?: {
    /** between 1 and 31 */
    day: number
    /** between 1 and 12 */
    month: number
    /** four digit year */
    year: number
  }
  /** Contains customer's billing address — required if not set on order via API */
  billingAddress?: Address
  /** The same object as billingAddress object, however, it is only displayed in the order details on the [merchant dashboard](https://business.revolut.com/merchant) */
  shippingAddress?: Address
}

export interface CommonOptions {
  /** Controls the language of the text in the widget method */
  locale?: Locale | 'auto'
  /** Callback will be called when the payment is completed successfully */
  onSuccess?: () => void
  /** Callback if transaction is failed to complete, the reason should be available in the message parameter */
  onError?: (error: RevolutCheckoutError) => void
  /** Callback if an user did not complete the transaction and canceled the authorisation or closed the checkout window */
  onCancel?: () => void
  /** Indicates in which case this saved payment method can be used for payments */
  savePaymentMethodFor?: 'merchant' | 'customer'
}
export interface PopupOptions extends CustomerDetails, CommonOptions {}

export interface CardFieldOptions extends PopupOptions {
  /** Empty `<div>` inside your form */
  target: HTMLElement
  /** Styles object for customisation inside the card field iframe */
  styles?: FieldStyles
  /**
   * Classes that will be applied to `target` div.
   * Default to:
   *
   * ```js
   * {
   *  default: 'rc-card-field',
   *  focused: 'rc-card-field--focused',
   *  invalid: 'rc-card-field--invalid',
   *  empty: 'rc-card-field--empty',
   *  autofilled: 'rc-card-field--autofilled',
   *  completed : 'rc-card-field--completed'
   * }
   * ```
   */
  classes?: FieldClasses
  /** Whether to prefer dark or light theme. Defaults to light */
  theme?: 'light' | 'dark'
  /**
   * Don't ask user for the `postcode` inside the card field.
   *
   * When disabling it, make sure that you provide full customer `billingAddress` in `.submit`
   */
  hidePostcodeField?: boolean
  /** Callback called on field validation and contains arroy of `ValidationError`. */
  onValidation?: (errors: ValidationError[]) => void
  /**
   * Callback called on field status change and contains status object,
   * depending on current field state:
   *
   * ```ts
   * {
   *  focused: boolean
   *  invalid: boolean
   *  empty: boolean
   *  autofilled: boolean
   *  completed : boolean
   * }
   * ```
   */
  onStatusChange?: (status: FieldStatus) => void
}

export interface RevolutPayPopupOptions {
  /**
   * Whether the popup should close when the overlay is clicked.
   * Defaults to true
   */
  closeOnOverlayClick?: boolean
}

export interface RevolutPayOptions extends CommonOptions {
  /** Empty element inside payment page */
  target: HTMLElement
  /** Revolut user phone number */
  phone?: string
  /** Revolut user email */
  email?: string
  /** Styles of the RevolutPay button */
  buttonStyle?: ButtonStyleOptions
  /** Configuration options of the RevolutPay popup */
  popupOptions?: RevolutPayPopupOptions
  /** Prefilled customer details. Only valid details are prefilled. */
  customer?: CustomerDetails
  /** Callback when user clicks on the RevolutPay button */
  onClick?: () => void
}

export interface PaymentRequestOptions extends CommonOptions {
  /** Empty element inside payment page */
  target: HTMLElement
  /** Request shipping in payment request UI */
  requestShipping?: boolean
  /** Request payer name in payment request UI */
  requestPayerName?: boolean
  /** Request payer phone in payment request UI */
  requestPayerPhone?: boolean
  /** Request payer email in payment request UI */
  requestPayerEmail?: boolean
  /** Disable payment request via basic card */
  disableBasicCard?: boolean
  /** Styles of the PaymentRequest button */
  buttonStyle?: ButtonStyleOptions
}

export interface RevolutCheckoutCardField extends RevolutCheckoutInstance {
  /** Submit entered card details along with a customer details */
  submit: (meta?: SubmitMeta) => void
  /** Manually trigger validation, by default field will show errors only after user interacted with it */
  validate: () => void
}

export type PaymentRequestPaymentMethod = 'applePay' | 'googlePay'

export interface PaymentRequestInstance {
  /** Render the payment request button */
  render: () => Promise<void>
  /** Check if user can make payment via a supported payment request method  */
  canMakePayment: () => Promise<PaymentRequestPaymentMethod | null>
  /** Manually destroy the payment request if needed */
  destroy: () => void
}

type CommonPaymentsRevolutPayOptions = {
  /** Decide whether to use fast checkout or not  **/
  requestShipping?: boolean
  /** Alternative API to payment events */
  redirectUrls?: {
    success: string
    failure: string
    cancel: string
  }
  /** Similar to redirectUrls option, however only used for mobile devices */
  mobileRedirectUrls?: {
    success: string
    failure: string
    cancel: string
  }
  billingAddress?: Address
  buttonStyle?: ButtonStyleOptions
  /** Prefill your customer details within the Revolut pay popup */
  customer?: CustomerDetails
  /** Validation function to be resolved before a user can make payments.
   * Throw an error and the error message will be displayed in the Revolut pay popup  */
  validate?: () => Promise<boolean> | boolean
  /** A function to create a Revolut order at a later time within the Revolut pay flow  */
  createOrder: () => Promise<{ publicId: string }>
  __features?: Record<string, any>
  __metadata?: Record<string, any>
}

type RevolutPayLineItem = {
  name: string
  totalAmount: string
  unitPriceAmount: string

  quantity?: {
    value: number
    unit: 'PIECES'
  }
  type?:
    | 'TAX'
    | 'GIFT'
    | 'MISC'
    | 'REFUND'
    | 'CHARGE'
    | 'SERVICE'
    | 'PHYSICAL'
    | 'ADJUSTMENT'
  productId?: string
  productUrl?: string
  description?: string
  taxes?: {
    name: string
    amount: string
    type?: 'INCLUDED'
  }[]
  imageUrls?: string[]
  totalTaxAmount?: string
  totalDiscountAmount?: string
  discounts?: {
    name: string
    type?: 'FIXED'
    totalAmount?: number
    appliedAmount?: number
  }[]
  metadata?: Record<string, string>
}

type CreateRevolutPaySessionParams = {
  currency: string
  totalAmount: number
  lineItems?: RevolutPayLineItem[]
}

export type WidgetPaymentsRevolutPayOptions =
  | (CommonPaymentsRevolutPayOptions & CreateRevolutPaySessionParams)
  | (CommonPaymentsRevolutPayOptions & { sessionToken: string })

type RevolutPayDropOffState =
  | 'enter_otp'
  | 'payment_summary'
  | 'load_session_data'
  | 'enter_card_details'
  | 'verify_user_details'
  | 'enter_personal_details'
  | 'enter_shipping_details'
  | 'revolut_app_push_challenge'

export type RevolutPayEvents =
  | {
      type: 'payment'
      payload:
        | {
            type: 'success'
            orderId: string
          }
        | { type: 'error'; error: RevolutCheckoutError; orderId: string }
        | {
            type: 'cancel'
            dropOffState: RevolutPayDropOffState
            orderId?: string
          }
    }
  | {
      type: 'click'
      payload: null
    }

export type RevolutPayEventPayload<
  T extends RevolutPayEvents['type']
> = Extract<RevolutPayEvents, { type: T }>['payload']

export interface PaymentsModuleRevolutPayInstance {
  mount: (
    target: string | HTMLElement | null,
    options: WidgetPaymentsRevolutPayOptions
  ) => void
  on: <T extends RevolutPayEvents['type']>(
    event: T,
    callback: (payload: RevolutPayEventPayload<T>) => void
  ) => void
  destroy: () => void
}

export interface WidgetPaymentRequestInstance
  extends PaymentRequestInstance,
    RevolutCheckoutInstance {}

export interface PaymentsModulePaymentRequestOptions
  extends Omit<
    PaymentRequestOptions,
    'token' | 'target' | 'disableApplePay' | 'disableBasicCard'
  > {
  /** The amount to be paid by the customer, in the lowest denomination (e.g. cents). */
  amount: number
  /** ISO 4217 currency code in upper case. */
  currency: string
  /** Preferred method ('applePay' or 'googlePay') or an array of methods in order of preference */
  preferredPaymentMethod?:
    | PaymentRequestPaymentMethod
    | Array<PaymentRequestPaymentMethod>
  /** A function to create a Revolut order at a later time within the flow  */
  createOrder: () => Promise<{ publicId: string }>
}

export interface PaymentsModulePaymentRequest {
  (
    target: HTMLElement,
    options: PaymentsModulePaymentRequestOptions
  ): PaymentRequestInstance

  destroy: () => void
}

export interface RevolutCheckoutInstance {
  /**
   * Show full-screen payment form with card field and user email.
   *
   * @see https://developer.revolut.com/docs/revolut-checkout-js/#instance-instance-paywithpopup
   */
  payWithPopup: (options?: PopupOptions) => RevolutCheckoutInstance
  /**
   * Create integrated card field inside your form.
   *
   * @see https://developer.revolut.com/docs/revolut-checkout-js/#instance-instance-createcardfield
   */
  createCardField: (options?: CardFieldOptions) => RevolutCheckoutCardField
  /** Accept payments via Revolut pay */
  revolutPay: (options: RevolutPayOptions) => RevolutCheckoutInstance
  /** Accept payments via open banking */
  openBanking?: (options: CommonOptions) => RevolutCheckoutInstance
  /** Accept payments via the W3C payment request API */
  paymentRequest: (options: PaymentRequestOptions) => PaymentRequestInstance
  /** Manually destroy popup or card field if needed	 */
  destroy: () => void
  /** Controls the language of the text in the widget */
  setDefaultLocale: (lang: Locale | 'auto') => void
  /** The payments module returned as part of the checkout instance  */
  payments: (
    option: RevolutPaymentsModuleOptions
  ) => RevolutPaymentsModuleInstance
}

export interface RevolutPaymentsModuleInstance {
  /** Accept payments via Revolut pay v2 */
  revolutPay: PaymentsModuleRevolutPayInstance
  /** Accept payments via Apple Pay or Google Pay */
  paymentRequest: PaymentsModulePaymentRequest
  /** Manually destroy the instance	 */
  destroy: () => void
  /** Controls the language of the text in the widget */
  setDefaultLocale: (lang: Locale | 'auto') => void
  /** Poll and react to the status of an order payment */
  pollPaymentState: (
    orderToken: string,
    callbacks: {
      onSuccess: () => void
      onError: (error: RevolutCheckoutError) => void
      /** Specifically handle poll errors e.g., network connection issues. Return a value (nullable) to stop polling completely */
      onPollError?: (error: RevolutCheckoutError) => void
    }
  ) => () => void
}

export interface RevolutPaymentsModuleOptions {
  publicToken: string
  locale?: string | 'auto'
}

export interface RevolutUpsellModuleInstance {
  /** Card gateway upsell banner */
  cardGatewayBanner: UpsellModuleCardGatewayBannerInstance
  /** Promotional banner */
  promotionalBanner: UpsellModulePromotionalBannerInstance
  /** Enrollment confirmation banner */
  enrollmentConfirmationBanner: UpsellModuleEnrollmentConfirmationBannerInstance
  /** Manually destroy the instance	 */
  destroy: () => void
  /** Controls the language of the text in the widget */
  setDefaultLocale: (lang: Locale | 'auto') => void
}

export interface UpsellModuleCardGatewayBannerInstance {
  mount: (
    target: string | HTMLElement,
    options: WidgetUpsellCardGatewayBannerOptions
  ) => void
  destroy: () => void
}

export interface WidgetUpsellCardGatewayBannerOptions {
  orderToken: string
  style?: {
    border?: string
    borderRadius?: string
  }
}

export interface UpsellModulePromotionalBannerInstance {
  mount: (
    target: string | HTMLElement,
    options: WidgetUpsellPromotionalBannerOptions
  ) => void
  destroy: () => void
}

export type WidgetUpsellPromotionalBannerOptions =
  | WidgetUpsellPromotionalBannerSignUpBannerOptions
  | WidgetUpsellPromotionalBannerInformationalBannerOptions
  | WidgetUpsellPromotionalBannerInformationalLinkOptions
  | WidgetUpsellPromotionalBannerInformationalIconOptions

export interface WidgetUpsellPromotionalBannerSignUpBannerOptions {
  /** Promotional banner which allows your customer to join Revolut and get rewards if applicable */
  variant?: 'sign_up'
  /** Unique id of transaction user has just performed */
  transactionId: string
  /** Transaction amount */
  amount?: number
  /** Transaction currency */
  currency: string
  /** Prefilled customer details within the banner */
  customer?: Partial<CustomerDetails>
  /** Style object for customisation */
  style?: {
    border?: string
    borderRadius?: string
    backgroundColor?: string
    primaryColor?: string
  }
}

export interface WidgetUpsellPromotionalBannerInformationalBannerOptions {
  /** Promotional banner with a summary of Revolut Pay benefits, allowing to view more details on click */
  variant: 'banner'
  /** Checkout amount */
  amount?: number
  /** Checkout currency */
  currency: string
}

export interface WidgetUpsellPromotionalBannerInformationalLinkOptions {
  /** Promotional banner displayed as a link, allowing to view Revolut Pay details on click */
  variant: 'link'
  /** Checkout amount */
  amount?: number
  /** Checkout currency */
  currency: string
  /** Style object for customisation */
  style?: {
    text?: 'learn_more' | 'cashback' | 'get_discounts' | 'earn_as_customer'
    color?: 'blue' | 'black'
  }
}

export interface WidgetUpsellPromotionalBannerInformationalIconOptions {
  /** Promotional banner displayed as an icon, allowing to view Revolut Pay details on click */
  variant: 'icon'
  /** Checkout amount */
  amount?: number
  /** Checkout currency */
  currency: string
}

export interface UpsellModuleEnrollmentConfirmationBannerInstance {
  mount: (
    target: string | HTMLElement,
    options: WidgetUpsellEnrollmentConfirmationBannerOptions
  ) => void
  destroy: () => void
}

export interface WidgetUpsellEnrollmentConfirmationBannerOptions {
  orderToken: string
  /** Prefilled customer details within the banner */
  customer?: Partial<CustomerDetails>
  style?: {
    backgroundColor?: string
  }
  /** Whether promotional banner should be shown if user has not enrolled */
  promotionalBanner?: boolean
  /** Style object for promotional banner customisation */
  promotionalBannerStyle?: WidgetUpsellPromotionalBannerSignUpBannerOptions['style']
}

export interface RevolutUpsellModuleOptions {
  publicToken: string
  locale?: string | 'auto'
}

/** @internal */
export interface RevolutCheckout {
  (token: string): RevolutCheckoutInstance
  payments: (
    option: RevolutPaymentsModuleOptions
  ) => RevolutPaymentsModuleInstance
  upsell: (option: RevolutUpsellModuleOptions) => RevolutUpsellModuleInstance
}
