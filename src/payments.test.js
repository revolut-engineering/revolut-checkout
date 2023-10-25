import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/dom'
import {
  triggerScriptOnLoad,
  triggerScriptOnError,
  settleVersionScript,
} from './testing'

afterEach(() => {
  jest.resetModules()

  document.querySelectorAll('script').forEach((el) => el.remove())
})

function setup() {
  const RevolutCheckout = require('./index').default

  const MockInstance = jest.fn()
  const MockRevolutCheckout = jest.fn(() => MockInstance)

  const MockPaymentInstance = jest.fn()
  const MockRevolutPayments = jest.fn(() => MockPaymentInstance)

  const TriggerSuccessEmbed = jest.fn(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          window.RevolutCheckout = MockRevolutCheckout
          window.RevolutCheckout.payments = MockRevolutPayments
          triggerScriptOnLoad('embed.js')
          resolve()
        })
      })
  )

  const TriggerErrorEmbed = jest.fn(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          triggerScriptOnError('embed.js')
          resolve()
        })
      })
  )

  const TriggerSuccessVersion = (version) =>
    settleVersionScript(() => {
      window.__REV_PAY_VERSION__ = version
      triggerScriptOnLoad('version.js')
    }, version)

  const TriggerErrorVersion = () =>
    settleVersionScript(() => {
      triggerScriptOnError('version.js')
    })

  return {
    MockInstance,
    MockPaymentInstance,
    MockRevolutPayments,
    MockRevolutCheckout,
    TriggerSuccessEmbed,
    TriggerErrorEmbed,
    TriggerSuccessVersion,
    TriggerErrorVersion,
    RevolutPayments: RevolutCheckout.payments,
  }
}

test(`should load embed script for 'dev'`, async () => {
  const {
    RevolutPayments,
    MockRevolutCheckout,
    MockPaymentInstance,
    MockRevolutPayments,
    TriggerSuccessEmbed,
    TriggerSuccessVersion,
  } = setup()

  const promise = RevolutPayments({
    mode: 'dev',
    publicToken: 'MERCHANT_PUBLIC_TOKEN_DEV_XXX',
  })

  const versionScript = document.querySelector('script#revolut-pay-version')
  expect(versionScript).toHaveAttribute(
    'src',
    expect.stringMatching(
      /https:\/\/merchant.revolut.codes\/version.js\?version=\d+/
    )
  )

  await TriggerSuccessVersion('abc12345')

  const embedScript = document.querySelector('script#revolut-payments')
  expect(embedScript).toHaveAttribute(
    'src',
    'https://merchant.revolut.codes/embed.js?version=abc12345'
  )

  const spyLoad = jest.spyOn(embedScript, 'onload')

  await TriggerSuccessEmbed()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockPaymentInstance)
  expect(MockRevolutCheckout).not.toHaveBeenCalled()
  expect(MockRevolutPayments).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_DEV_XXX',
  })
})

test(`should load embed script for 'prod'`, async () => {
  const {
    RevolutPayments,
    MockPaymentInstance,
    MockRevolutCheckout,
    MockRevolutPayments,
    TriggerSuccessEmbed,
    TriggerSuccessVersion,
  } = setup()

  const promise = RevolutPayments({
    mode: 'prod',
    publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
  })

  const versionScript = document.querySelector('script#revolut-pay-version')
  expect(versionScript).toHaveAttribute(
    'src',
    expect.stringMatching(
      /https:\/\/merchant.revolut.com\/version.js\?version=\d+/
    )
  )

  await TriggerSuccessVersion('abc12345')

  const embedScript = document.querySelector('script#revolut-payments')
  expect(embedScript).toHaveAttribute(
    'src',
    'https://merchant.revolut.com/embed.js?version=abc12345'
  )

  const spyLoad = jest.spyOn(embedScript, 'onload')

  await TriggerSuccessEmbed()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockPaymentInstance)
  expect(MockRevolutCheckout).not.toHaveBeenCalled()
  expect(MockRevolutPayments).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
  })
})

test(`should load embed script for 'sandbox'`, async () => {
  const {
    RevolutPayments,
    MockRevolutCheckout,
    MockPaymentInstance,
    MockRevolutPayments,
    TriggerSuccessEmbed,
    TriggerSuccessVersion,
  } = setup()

  const promise = RevolutPayments({
    mode: 'sandbox',
    publicToken: 'MERCHANT_PUBLIC_TOKEN_SANDBOX_XXX',
  })

  const versionScript = document.querySelector('script#revolut-pay-version')
  expect(versionScript).toHaveAttribute(
    'src',
    expect.stringMatching(
      /https:\/\/sandbox-merchant.revolut.com\/version.js\?version=\d+/
    )
  )

  await TriggerSuccessVersion('abc12345')

  const embedScript = document.querySelector('script#revolut-payments')
  expect(embedScript).toHaveAttribute(
    'src',
    'https://sandbox-merchant.revolut.com/embed.js?version=abc12345'
  )

  const spyLoad = jest.spyOn(embedScript, 'onload')

  await TriggerSuccessEmbed()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockPaymentInstance)
  expect(MockRevolutCheckout).not.toHaveBeenCalled()
  expect(MockRevolutPayments).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_SANDBOX_XXX',
  })
})

test('should not request new embed script and use loaded one', async () => {
  const {
    RevolutPayments,
    MockRevolutPayments,
    TriggerSuccessVersion,
    TriggerSuccessEmbed,
  } = setup()

  const promise = RevolutPayments({ publicToken: 'MERCHANT_PUBLIC_TOKEN_1' })

  await TriggerSuccessVersion('')
  await TriggerSuccessEmbed()

  await promise
  expect(MockRevolutPayments).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_1',
  })

  await RevolutPayments({ publicToken: 'MERCHANT_PUBLIC_TOKEN_2' })
  expect(MockRevolutPayments).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_2',
  })
})

test(`should use 'prod' by default`, async () => {
  const {
    RevolutPayments,
    MockPaymentInstance,
    MockRevolutPayments,
    TriggerSuccessVersion,
    TriggerSuccessEmbed,
  } = setup()

  const promise = RevolutPayments({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
  })

  const versionScript = document.querySelector('script#revolut-pay-version')
  expect(versionScript).toHaveAttribute(
    'src',
    expect.stringMatching(
      /https:\/\/merchant.revolut.com\/version.js\?version=\d+/
    )
  )

  await TriggerSuccessVersion('')

  const embedScript = document.querySelector('script#revolut-payments')
  expect(embedScript).toHaveAttribute(
    'src',
    'https://merchant.revolut.com/embed.js'
  )

  const spyLoad = jest.spyOn(embedScript, 'onload')

  await TriggerSuccessEmbed()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockPaymentInstance)
  expect(MockRevolutPayments).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
  })
})

test('should load embed script without version parameter if version script fails to load', async () => {
  const {
    RevolutPayments,
    MockPaymentInstance,
    MockRevolutPayments,
    TriggerErrorVersion,
    TriggerSuccessEmbed,
  } = setup()

  const promise = RevolutPayments({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
  })

  await TriggerErrorVersion()

  const embedScript = document.querySelector('script#revolut-payments')
  expect(embedScript).toHaveAttribute(
    'src',
    'https://merchant.revolut.com/embed.js'
  )

  const spyLoad = jest.spyOn(embedScript, 'onload')

  await TriggerSuccessEmbed()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockPaymentInstance)
  expect(MockRevolutPayments).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
  })
})

test('should throw error on failed loading', async () => {
  expect.assertions(1)

  const { RevolutPayments, TriggerSuccessVersion, TriggerErrorEmbed } = setup()

  try {
    const promise = RevolutPayments({
      publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
    })

    await TriggerSuccessVersion('')
    await TriggerErrorEmbed()

    await promise
  } catch (error) {
    expect(error.message).toBe(
      `'RevolutPayments' failed to load: Network error encountered`
    )
  }
})

test('should throw error if RevolutCheckout is missing', async () => {
  const {
    RevolutPayments,
    TriggerSuccessVersion,
    TriggerSuccessEmbed,
  } = setup()

  const promise = RevolutPayments({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
  })

  await TriggerSuccessVersion('')

  const embedScript = document.querySelector('script#revolut-payments')
  expect(embedScript).toHaveAttribute(
    'src',
    'https://merchant.revolut.com/embed.js'
  )

  TriggerSuccessEmbed.mockImplementationOnce(() => {
    // RevolutCheckout is not assigned to window
    fireEvent.load(embedScript)
  })
  await TriggerSuccessEmbed()

  await expect(promise).rejects.toEqual(
    new Error(
      `'RevolutPayments' failed to load: RevolutCheckout is not a function`
    )
  )
})
