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

  const MockUpsellInstance = jest.fn()
  const MockRevolutUpsell = jest.fn(() => MockUpsellInstance)

  const TriggerSuccessEmbed = jest.fn(() => {
    setTimeout(() => {
      window.RevolutUpsell = MockRevolutUpsell
      triggerScriptOnLoad('embed.js')
    })
  })

  const TriggerError = jest.fn(() => {
    setTimeout(() => {
      triggerScriptOnError('embed.js')
    })
  })

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
    MockUpsellInstance,
    MockRevolutUpsell,
    TriggerSuccessEmbed,
    TriggerError,
    TriggerSuccessVersion,
    TriggerErrorVersion,
    RevolutUpsell: RevolutCheckout.upsell,
  }
}

test(`should load embed script for 'dev'`, async () => {
  const {
    RevolutUpsell,
    MockUpsellInstance,
    MockRevolutUpsell,
    TriggerSuccessEmbed,
    TriggerSuccessVersion,
  } = setup()

  const promise = RevolutUpsell({
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

  const embedScript = document.querySelector('script#revolut-upsell')
  expect(embedScript).toHaveAttribute(
    'src',
    'https://merchant.revolut.codes/upsell/embed.js?version=abc12345'
  )

  const spyLoad = jest.spyOn(embedScript, 'onload')

  await TriggerSuccessEmbed()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockUpsellInstance)
  expect(MockRevolutUpsell).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_DEV_XXX',
  })
})

test(`should load embed script for 'prod'`, async () => {
  const {
    RevolutUpsell,
    MockUpsellInstance,
    MockRevolutUpsell,
    TriggerSuccessEmbed,
    TriggerSuccessVersion,
  } = setup()

  const promise = RevolutUpsell({
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

  const embedScript = document.querySelector('script#revolut-upsell')
  expect(embedScript).toHaveAttribute(
    'src',
    'https://merchant.revolut.com/upsell/embed.js?version=abc12345'
  )

  const spyLoad = jest.spyOn(embedScript, 'onload')

  await TriggerSuccessEmbed()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockUpsellInstance)
  expect(MockRevolutUpsell).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
  })
})

test(`should load embed script for 'sandbox'`, async () => {
  const {
    RevolutUpsell,
    MockUpsellInstance,
    MockRevolutUpsell,
    TriggerSuccessEmbed,
    TriggerSuccessVersion,
  } = setup()

  const promise = RevolutUpsell({
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

  const embedScript = document.querySelector('script#revolut-upsell')
  expect(embedScript).toHaveAttribute(
    'src',
    'https://sandbox-merchant.revolut.com/upsell/embed.js?version=abc12345'
  )

  const spyLoad = jest.spyOn(embedScript, 'onload')

  await TriggerSuccessEmbed()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockUpsellInstance)
  expect(MockRevolutUpsell).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_SANDBOX_XXX',
  })
})

test('should not request new embed script and use loaded one', async () => {
  const {
    RevolutUpsell,
    MockRevolutUpsell,
    TriggerSuccessVersion,
    TriggerSuccessEmbed,
  } = setup()

  const promise = RevolutUpsell({ publicToken: 'MERCHANT_PUBLIC_TOKEN_1' })

  await TriggerSuccessVersion()
  await TriggerSuccessEmbed()

  await promise
  expect(MockRevolutUpsell).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_1',
  })

  await RevolutUpsell({ publicToken: 'MERCHANT_PUBLIC_TOKEN_2' })
  expect(MockRevolutUpsell).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_2',
  })
})

test(`should use 'prod' by default`, async () => {
  const {
    RevolutUpsell,
    MockUpsellInstance,
    MockRevolutUpsell,
    TriggerSuccessEmbed,
    TriggerSuccessVersion,
  } = setup()

  const promise = RevolutUpsell({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
  })

  await TriggerSuccessVersion()

  const embedScript = document.querySelector('script#revolut-upsell')
  expect(embedScript).toHaveAttribute(
    'src',
    'https://merchant.revolut.com/upsell/embed.js'
  )

  const spyLoad = jest.spyOn(embedScript, 'onload')

  await TriggerSuccessEmbed()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockUpsellInstance)
  expect(MockRevolutUpsell).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
  })
})

test('should load embed script without version parameter if version script fails to load', async () => {
  const {
    RevolutUpsell,
    MockRevolutUpsell,
    TriggerErrorVersion,
    TriggerSuccessEmbed,
  } = setup()

  const promise = RevolutUpsell({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
  })

  await TriggerErrorVersion()

  const embedScript = document.querySelector('script#revolut-upsell')
  expect(embedScript).toHaveAttribute(
    'src',
    'https://merchant.revolut.com/upsell/embed.js'
  )

  await TriggerSuccessEmbed()

  await promise
  expect(MockRevolutUpsell).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
  })
})

test('should throw error on failed loading', async () => {
  expect.assertions(1)

  const { RevolutUpsell, TriggerSuccessVersion, TriggerError } = setup()

  try {
    const promise = RevolutUpsell({
      publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
    })

    await TriggerSuccessVersion()
    await TriggerError()

    await promise
  } catch (error) {
    expect(error.message).toBe(
      `'RevolutUpsell' failed to load: Network error encountered`
    )
  }
})

test('should throw error if RevolutCheckout is missing', async () => {
  const { RevolutUpsell, TriggerSuccessVersion, TriggerSuccessEmbed } = setup()

  const promise = RevolutUpsell({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
  })

  await TriggerSuccessVersion()

  const embedScript = document.querySelector('script#revolut-upsell')
  expect(embedScript).toHaveAttribute(
    'src',
    'https://merchant.revolut.com/upsell/embed.js'
  )

  TriggerSuccessEmbed.mockImplementationOnce(() => {
    // RevolutUpsell is not assigned to window
    fireEvent.load(embedScript)
  })
  await TriggerSuccessEmbed()

  await expect(promise).rejects.toEqual(
    new Error(`'RevolutUpsell' failed to load: RevolutUpsell is not a function`)
  )
})
