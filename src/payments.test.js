import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/dom'

afterEach(() => jest.resetModules())

function setup() {
  const RevolutCheckout = require('./index').default
  const script = document.createElement('script')

  const MockInstance = jest.fn()
  const MockRevolutCheckout = jest.fn(() => MockInstance)

  const MockPaymentInstance = jest.fn()
  const MockRevolutPayments = jest.fn(() => MockPaymentInstance)

  const TriggerSuccess = jest.fn(() => {
    setTimeout(() => {
      window.RevolutCheckout = MockRevolutCheckout
      window.RevolutCheckout.payments = MockRevolutPayments
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
    MockInstance,
    MockPaymentInstance,
    MockRevolutPayments,
    MockRevolutCheckout,
    TriggerSuccess,
    TriggerError,
    RevolutPayments: RevolutCheckout.payments,
  }
}

test(`should load embed script for 'dev'`, async () => {
  const {
    script,
    RevolutPayments,
    MockRevolutCheckout,
    MockPaymentInstance,
    MockRevolutPayments,
    TriggerSuccess,
  } = setup()

  const promise = RevolutPayments({
    mode: 'dev',
    publicToken: 'MERCHANT_PUBLIC_TOKEN_DEV_XXX',
  })
  const spyLoad = jest.spyOn(script, 'onload')

  expect(script).toHaveAttribute('id', 'revolut-payments')
  expect(script).toHaveAttribute(
    'src',
    'https://merchant.revolut.codes/embed.js'
  )

  TriggerSuccess()

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
    script,
    RevolutPayments,
    MockPaymentInstance,
    MockRevolutCheckout,
    MockRevolutPayments,
    TriggerSuccess,
  } = setup()

  const promise = RevolutPayments({
    mode: 'prod',
    publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
  })
  const spyLoad = jest.spyOn(script, 'onload')

  expect(script).toHaveAttribute('id', 'revolut-payments')
  expect(script).toHaveAttribute('src', 'https://merchant.revolut.com/embed.js')

  TriggerSuccess()

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
    script,
    RevolutPayments,
    MockRevolutCheckout,
    MockPaymentInstance,
    MockRevolutPayments,
    TriggerSuccess,
  } = setup()

  const promise = RevolutPayments({
    mode: 'sandbox',
    publicToken: 'MERCHANT_PUBLIC_TOKEN_SANDBOX_XXX',
  })
  const spyLoad = jest.spyOn(script, 'onload')

  expect(script).toHaveAttribute('id', 'revolut-payments')
  expect(script).toHaveAttribute(
    'src',
    'https://sandbox-merchant.revolut.com/embed.js'
  )

  TriggerSuccess()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockPaymentInstance)
  expect(MockRevolutCheckout).not.toHaveBeenCalled()
  expect(MockRevolutPayments).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_SANDBOX_XXX',
  })
})

test('should not request new embed script and use loaded one', async () => {
  const { RevolutPayments, MockRevolutPayments, TriggerSuccess } = setup()

  const promise = RevolutPayments({ publicToken: 'MERCHANT_PUBLIC_TOKEN_1' })

  TriggerSuccess()

  await promise
  expect(MockRevolutPayments).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_1',
  })

  await RevolutPayments('MERCHANT_PUBLIC_TOKEN_2')
  expect(MockRevolutPayments).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_2',
  })
})

test(`should use 'prod' by default`, async () => {
  const {
    script,
    RevolutPayments,
    MockPaymentInstance,
    MockRevolutPayments,
    TriggerSuccess,
  } = setup()

  const promise = RevolutPayments({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
  })
  const spyLoad = jest.spyOn(script, 'onload')

  expect(script).toHaveAttribute('id', 'revolut-payments')
  expect(script).toHaveAttribute('src', 'https://merchant.revolut.com/embed.js')

  TriggerSuccess()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockPaymentInstance)
  expect(MockRevolutPayments).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
  })
})

test.only('should throw error on failed loading', async () => {
  expect.assertions(1)

  const { RevolutPayments, TriggerError } = setup()

  try {
    const promise = RevolutPayments({
      publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
    })

    TriggerError()

    await promise
  } catch (error) {
    expect(error.message).toBe(`'RevolutPayments' failed to load`)
  }
})
