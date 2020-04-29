import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/dom'

afterEach(() => jest.resetModules())

function setup() {
  const RevolutCheckout = require('./index').default
  const script = document.createElement('script')

  const MockInstance = jest.fn()
  const MockRevolutCheckout = jest.fn(() => MockInstance)

  const TriggerSuccess = jest.fn(() => {
    setTimeout(() => {
      window.RevolutCheckout = MockRevolutCheckout
      fireEvent.load(script)
    })
  })

  const TriggerError = jest.fn(() => {
    setTimeout(() => {
      fireEvent.error(script)
    })
  })

  jest.spyOn(document, 'createElement').mockImplementationOnce(() => script)

  return {
    script,
    RevolutCheckout,
    MockInstance,
    MockRevolutCheckout,
    TriggerSuccess,
    TriggerError,
  }
}

test(`should load embed script for 'dev'`, async () => {
  const {
    script,
    RevolutCheckout,
    MockInstance,
    MockRevolutCheckout,
    TriggerSuccess,
  } = setup()

  const promise = RevolutCheckout('DEV_XXX', 'dev')
  const spyLoad = jest.spyOn(script, 'onload')

  expect(script).toHaveAttribute('id', 'revolut-checkout')
  expect(script).toHaveAttribute(
    'src',
    'https://merchant.revolut.codes/embed.js'
  )

  TriggerSuccess()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockInstance)
  expect(MockRevolutCheckout).toHaveBeenCalledWith('DEV_XXX')
})

test(`should load embed script for 'prod'`, async () => {
  const {
    script,
    RevolutCheckout,
    MockInstance,
    MockRevolutCheckout,
    TriggerSuccess,
  } = setup()

  const promise = RevolutCheckout('PROD_XXX', 'prod')
  const spyLoad = jest.spyOn(script, 'onload')

  expect(script).toHaveAttribute('id', 'revolut-checkout')
  expect(script).toHaveAttribute('src', 'https://merchant.revolut.com/embed.js')

  TriggerSuccess()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockInstance)
  expect(MockRevolutCheckout).toHaveBeenCalledWith('PROD_XXX')
})

test(`should load embed script for 'sandbox'`, async () => {
  const {
    script,
    RevolutCheckout,
    MockInstance,
    MockRevolutCheckout,
    TriggerSuccess,
  } = setup()

  const promise = RevolutCheckout('SANDBOX_XXX', 'sandbox')
  const spyLoad = jest.spyOn(script, 'onload')

  expect(script).toHaveAttribute('id', 'revolut-checkout')
  expect(script).toHaveAttribute(
    'src',
    'https://sandbox-merchant.revolut.com/embed.js'
  )

  TriggerSuccess()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockInstance)
  expect(MockRevolutCheckout).toHaveBeenCalledWith('SANDBOX_XXX')
})

test('should not request new embed script and use loaded one', async () => {
  const { RevolutCheckout, MockRevolutCheckout, TriggerSuccess } = setup()

  const promise = RevolutCheckout('XXX_1')

  TriggerSuccess()

  await promise
  expect(MockRevolutCheckout).toHaveBeenCalledWith('XXX_1')

  await RevolutCheckout('XXX_2')
  expect(MockRevolutCheckout).toHaveBeenCalledWith('XXX_2')
})

test(`should use 'prod' by default`, async () => {
  const {
    script,
    RevolutCheckout,
    MockInstance,
    MockRevolutCheckout,
    TriggerSuccess,
  } = setup()

  const promise = RevolutCheckout('PROD_XXX')
  const spyLoad = jest.spyOn(script, 'onload')

  expect(script).toHaveAttribute('id', 'revolut-checkout')
  expect(script).toHaveAttribute('src', 'https://merchant.revolut.com/embed.js')

  TriggerSuccess()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockInstance)
  expect(MockRevolutCheckout).toHaveBeenCalledWith('PROD_XXX')
})

test('should throw error on failed loading', async () => {
  expect.assertions(1)

  const { RevolutCheckout, TriggerError } = setup()

  try {
    const promise = RevolutCheckout('PROD_XXX')

    TriggerError()

    await promise
  } catch (error) {
    expect(error.message).toBe(`'RevolutCheckout' is failed to load`)
  }
})
