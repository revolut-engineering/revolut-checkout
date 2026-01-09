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

  const TriggerSuccessEmbed = jest.fn(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          window.RevolutCheckout = MockRevolutCheckout
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
    RevolutCheckout,
    MockInstance,
    MockRevolutCheckout,
    TriggerSuccessVersion,
    TriggerErrorVersion,
    TriggerSuccessEmbed,
    TriggerErrorEmbed,
  }
}

test(`should load embed script for 'dev'`, async () => {
  const {
    RevolutCheckout,
    MockInstance,
    MockRevolutCheckout,
    TriggerSuccessEmbed,
    TriggerSuccessVersion,
  } = setup()

  const promise = RevolutCheckout('DEV_XXX', 'dev')

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
  expect(instance).toBe(MockInstance)
  expect(MockRevolutCheckout).toHaveBeenCalledWith('DEV_XXX')
})

test(`should load embed script for 'prod'`, async () => {
  const {
    RevolutCheckout,
    MockInstance,
    MockRevolutCheckout,
    TriggerSuccessVersion,
    TriggerSuccessEmbed,
  } = setup()

  const promise = RevolutCheckout('PROD_XXX', 'prod')

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
  expect(instance).toBe(MockInstance)
  expect(MockRevolutCheckout).toHaveBeenCalledWith('PROD_XXX')
})

test(`should load embed script for 'sandbox'`, async () => {
  const {
    RevolutCheckout,
    MockInstance,
    MockRevolutCheckout,
    TriggerSuccessVersion,
    TriggerSuccessEmbed,
  } = setup()

  const promise = RevolutCheckout('SANDBOX_XXX', 'sandbox')

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
  expect(instance).toBe(MockInstance)
  expect(MockRevolutCheckout).toHaveBeenCalledWith('SANDBOX_XXX')
})

test('should not request new embed script and use loaded one', async () => {
  const {
    RevolutCheckout,
    MockRevolutCheckout,
    TriggerSuccessVersion,
    TriggerSuccessEmbed,
  } = setup()

  const promise = RevolutCheckout('XXX_1')

  await TriggerSuccessVersion('')
  await TriggerSuccessEmbed()

  await promise
  expect(MockRevolutCheckout).toHaveBeenCalledWith('XXX_1')

  await RevolutCheckout('XXX_2')
  expect(MockRevolutCheckout).toHaveBeenCalledWith('XXX_2')
})

test(`should support loading multiple embed scripts for 'dev'`, async () => {
  const {
    RevolutCheckout,
    MockInstance,
    MockRevolutCheckout,
    TriggerSuccessEmbed,
    TriggerSuccessVersion,
  } = setup()

  const promise1 = RevolutCheckout('DEV_XXX1', 'dev')
  const promise2 = RevolutCheckout('DEV_XXX2', 'dev')

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

  expect(instance1).toBe(instance2)
  expect(spyLoad).toHaveBeenCalled()
  expect(instance1).toBe(MockInstance)
  expect(instance2).toBe(MockInstance)
  expect(MockRevolutCheckout).toHaveBeenCalledWith('DEV_XXX1')
  expect(MockRevolutCheckout).toHaveBeenCalledWith('DEV_XXX2')
})

test(`should use 'prod' by default`, async () => {
  const {
    RevolutCheckout,
    MockInstance,
    MockRevolutCheckout,
    TriggerSuccessVersion,
    TriggerSuccessEmbed,
  } = setup()

  const promise = RevolutCheckout('PROD_XXX')

  await TriggerSuccessVersion('')

  const embedScript = document.querySelector('script#revolut-checkout')
  expect(embedScript).toHaveAttribute(
    'src',
    'https://merchant.revolut.com/embed.js'
  )

  const spyLoad = jest.spyOn(embedScript, 'onload')

  await TriggerSuccessEmbed()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockInstance)
  expect(MockRevolutCheckout).toHaveBeenCalledWith('PROD_XXX')
})

test('should load embed script without version parameter if version script fails to load', async () => {
  const {
    RevolutCheckout,
    MockRevolutCheckout,
    TriggerErrorVersion,
    TriggerSuccessEmbed,
  } = setup()

  const promise = RevolutCheckout('PROD_XXX')

  await TriggerErrorVersion()

  const embedScript = document.querySelector('script#revolut-checkout')
  expect(embedScript).toHaveAttribute(
    'src',
    'https://merchant.revolut.com/embed.js'
  )

  await TriggerSuccessEmbed()

  await promise
  expect(MockRevolutCheckout).toHaveBeenCalledWith('PROD_XXX')
})

test('should throw error on failed embed script loading', async () => {
  expect.assertions(1)

  const { RevolutCheckout, TriggerSuccessVersion, TriggerErrorEmbed } = setup()

  try {
    const promise = RevolutCheckout('PROD_XXX')

    await TriggerSuccessVersion()
    await TriggerErrorEmbed()

    await promise
  } catch (error) {
    expect(error.message).toBe(
      `'RevolutCheckout' failed to load: Network error encountered`
    )
  }
})

test('should throw error if RevolutCheckout is missing', async () => {
  const {
    RevolutCheckout,
    TriggerSuccessVersion,
    TriggerSuccessEmbed,
  } = setup()

  const promise = RevolutCheckout('PROD_XXX')

  await TriggerSuccessVersion()

  const embedScript = document.querySelector('script#revolut-checkout')
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
      `'RevolutCheckout' failed to load: RevolutCheckout is not a function`
    )
  )
})
