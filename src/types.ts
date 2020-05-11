import { MODE } from './constants'

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

export type ValidationErrorType =
  | 'validation.card.number.incomplete'
  | 'validation.card.number.invalid'
  | 'validation.card.number.required'
  | 'validation.card.expiry.expired'
  | 'validation.card.expiry.incomplete'
  | 'validation.card.expiry.required'
  | 'validation.card.cvv.invalid'
  | 'validation.card.cvv.required'
  | 'validation.postcode.invalid'
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

export interface ValidationError extends Error {
  name: 'Validation'
  type: ValidationErrorType
}

export interface RevolutCheckoutError extends Error {
  name: 'RevolutCheckout'
  type: RevolutCheckoutErrorType
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
  /** Contains customer's billing address — required if not set on order via API */
  billingAddress?: Address
  /** The same object as billingAddress object, however, it is only displayed in the order details on the [merchant dashboard](https://business.revolut.com/merchant) */
  shippingAddress?: Address
}

export interface PopupOptions extends CustomerDetails {
  /** Callback will be called when the payment is completed successfully */
  onSuccess?: () => void
  /** Callback if transaction is failed to complete, the reason should be available in the message parameter */
  onError?: (error: RevolutCheckoutError) => void
  /** Callback if an user did not complete the transaction and canceled the authorisation or closed the checkout window */
  onCancel?: () => void
}

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

export interface RevolutCheckoutCardField extends RevolutCheckoutInstance {
  /** Submit entered card details along with a customer details */
  submit: (meta?: CustomerDetails) => void
  /** Manually trigger validation, by default field will show errors only after user interacted with it */
  validate: () => void
}

export interface RevolutCheckoutInstance {
  /**
   * Show full-screen payment form with card field and user email.
   *
   * @see https://developer.revolut.com/docs/merchant-api/#revolut-widget-revolut-widget-integration-guide-pop-up
   */
  payWithPopup: (options?: PopupOptions) => RevolutCheckoutInstance
  /**
   * Create integrated card field inside your form.
   *
   * @see https://developer.revolut.com/docs/merchant-api/#revolut-widget-revolut-widget-integration-guide-card-field
   */
  createCardField: (options?: CardFieldOptions) => RevolutCheckoutCardField
  /** Manually destroy popup or card field if needed	 */
  destroy: () => void
}

export interface RevolutCheckout {
  (token: string): Promise<RevolutCheckoutInstance>
}
