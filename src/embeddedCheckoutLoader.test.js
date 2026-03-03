import '@testing-library/jest-dom'
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

  const MockEmbeddedCheckoutInstance = jest.fn()
  const MockRevolutEmbeddedCheckout = jest.fn(
    () => MockEmbeddedCheckoutInstance
  )

  const TriggerSuccessEmbed = jest.fn(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          window.RevolutCheckout = MockRevolutCheckout
          window.RevolutCheckout.embeddedCheckout = MockRevolutEmbeddedCheckout
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
    MockEmbeddedCheckoutInstance,
    MockRevolutEmbeddedCheckout,
    MockRevolutCheckout,
    TriggerSuccessEmbed,
    TriggerErrorEmbed,
    TriggerSuccessVersion,
    TriggerErrorVersion,
    EmbeddedCheckout: RevolutCheckout.embeddedCheckout,
    RevolutCheckout,
  }
}

test(`should load embed script for 'dev'`, async () => {
  const {
    EmbeddedCheckout,
    MockRevolutCheckout,
    MockEmbeddedCheckoutInstance,
    MockRevolutEmbeddedCheckout,
    TriggerSuccessEmbed,
    TriggerSuccessVersion,
  } = setup()

  const promise = EmbeddedCheckout({
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

  const embedScript = document.querySelector('script#revolut-checkout')
  expect(embedScript).toHaveAttribute(
    'src',
    'https://merchant.revolut.codes/embed.js?version=abc12345'
  )

  const spyLoad = jest.spyOn(embedScript, 'onload')

  await TriggerSuccessEmbed()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockEmbeddedCheckoutInstance)
  expect(MockRevolutCheckout).not.toHaveBeenCalled()
  expect(MockRevolutEmbeddedCheckout).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_DEV_XXX',
  })
})

test(`should load embed script for 'prod'`, async () => {
  const {
    EmbeddedCheckout,
    MockEmbeddedCheckoutInstance,
    MockRevolutCheckout,
    MockRevolutEmbeddedCheckout,
    TriggerSuccessEmbed,
    TriggerSuccessVersion,
  } = setup()

  const promise = EmbeddedCheckout({
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

  const embedScript = document.querySelector('script#revolut-checkout')
  expect(embedScript).toHaveAttribute(
    'src',
    'https://merchant.revolut.com/embed.js?version=abc12345'
  )

  const spyLoad = jest.spyOn(embedScript, 'onload')

  await TriggerSuccessEmbed()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockEmbeddedCheckoutInstance)
  expect(MockRevolutCheckout).not.toHaveBeenCalled()
  expect(MockRevolutEmbeddedCheckout).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
  })
})

test(`should load embed script for 'sandbox'`, async () => {
  const {
    EmbeddedCheckout,
    MockRevolutCheckout,
    MockEmbeddedCheckoutInstance,
    MockRevolutEmbeddedCheckout,
    TriggerSuccessEmbed,
    TriggerSuccessVersion,
  } = setup()

  const promise = EmbeddedCheckout({
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

  const embedScript = document.querySelector('script#revolut-checkout')
  expect(embedScript).toHaveAttribute(
    'src',
    'https://sandbox-merchant.revolut.com/embed.js?version=abc12345'
  )

  const spyLoad = jest.spyOn(embedScript, 'onload')

  await TriggerSuccessEmbed()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockEmbeddedCheckoutInstance)
  expect(MockRevolutCheckout).not.toHaveBeenCalled()
  expect(MockRevolutEmbeddedCheckout).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_SANDBOX_XXX',
  })
})

test('should not request new embed script and use loaded one', async () => {
  const {
    EmbeddedCheckout,
    MockRevolutEmbeddedCheckout,
    TriggerSuccessVersion,
    TriggerSuccessEmbed,
  } = setup()

  const promise = EmbeddedCheckout({ publicToken: 'MERCHANT_PUBLIC_TOKEN_1' })

  await TriggerSuccessVersion('')
  await TriggerSuccessEmbed()

  await promise
  expect(MockRevolutEmbeddedCheckout).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_1',
  })

  await EmbeddedCheckout({ publicToken: 'MERCHANT_PUBLIC_TOKEN_2' })
  expect(MockRevolutEmbeddedCheckout).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_2',
  })
})

test(`should support loading multiple embed scripts for 'dev'`, async () => {
  const {
    EmbeddedCheckout,
    MockRevolutCheckout,
    MockEmbeddedCheckoutInstance,
    MockRevolutEmbeddedCheckout,
    TriggerSuccessEmbed,
    TriggerSuccessVersion,
  } = setup()

  const promise1 = EmbeddedCheckout({
    mode: 'dev',
    publicToken: 'MERCHANT_PUBLIC_TOKEN_DEV_XXX1',
  })
  const promise2 = EmbeddedCheckout({
    mode: 'dev',
    publicToken: 'MERCHANT_PUBLIC_TOKEN_DEV_XXX2',
  })

  const versionScript = document.querySelector('script#revolut-pay-version')
  expect(versionScript).toHaveAttribute(
    'src',
    expect.stringMatching(
      /https:\/\/merchant.revolut.codes\/version.js\?version=\d+/
    )
  )

  await TriggerSuccessVersion('abc12345')

  const embedScript = document.querySelector('script#revolut-checkout')
  expect(embedScript).toHaveAttribute(
    'src',
    'https://merchant.revolut.codes/embed.js?version=abc12345'
  )

  const spyLoad = jest.spyOn(embedScript, 'onload')

  await TriggerSuccessEmbed()

  const instance1 = await promise1
  const instance2 = await promise2

  expect(spyLoad).toHaveBeenCalled()
  expect(instance1).toBe(instance2)
  expect(instance1).toBe(MockEmbeddedCheckoutInstance)
  expect(instance2).toBe(MockEmbeddedCheckoutInstance)
  expect(MockRevolutCheckout).not.toHaveBeenCalled()
  expect(MockRevolutEmbeddedCheckout).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_DEV_XXX1',
  })
  expect(MockRevolutEmbeddedCheckout).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_DEV_XXX2',
  })
})
