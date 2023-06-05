import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/dom'

afterEach(() => jest.resetModules())

function setup() {
  const RevolutCheckout = require('./index').default
  const script = document.createElement('script')

  const MockUpsellInstance = jest.fn()
  const MockRevolutUpsell = jest.fn(() => MockUpsellInstance)

  const TriggerSuccess = jest.fn(() => {
    setTimeout(() => {
      window.RevolutUpsell = MockRevolutUpsell
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
    MockUpsellInstance,
    MockRevolutUpsell,
    TriggerSuccess,
    TriggerError,
    RevolutUpsell: RevolutCheckout.upsell,
  }
}

test(`should load embed script for 'dev'`, async () => {
  const {
    script,
    RevolutUpsell,
    MockUpsellInstance,
    MockRevolutUpsell,
    TriggerSuccess,
  } = setup()

  const promise = RevolutUpsell({
    mode: 'dev',
    publicToken: 'MERCHANT_PUBLIC_TOKEN_DEV_XXX',
  })
  const spyLoad = jest.spyOn(script, 'onload')

  expect(script).toHaveAttribute('id', 'revolut-upsell')
  expect(script).toHaveAttribute(
    'src',
    'https://merchant.revolut.codes/upsell/embed.js'
  )

  TriggerSuccess()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockUpsellInstance)
  expect(MockRevolutUpsell).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_DEV_XXX',
  })
})

test(`should load embed script for 'prod'`, async () => {
  const {
    script,
    RevolutUpsell,
    MockUpsellInstance,
    MockRevolutUpsell,
    TriggerSuccess,
  } = setup()

  const promise = RevolutUpsell({
    mode: 'prod',
    publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
  })
  const spyLoad = jest.spyOn(script, 'onload')

  expect(script).toHaveAttribute('id', 'revolut-upsell')
  expect(script).toHaveAttribute(
    'src',
    'https://merchant.revolut.com/upsell/embed.js'
  )

  TriggerSuccess()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockUpsellInstance)
  expect(MockRevolutUpsell).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
  })
})

test(`should load embed script for 'sandbox'`, async () => {
  const {
    script,
    RevolutUpsell,
    MockUpsellInstance,
    MockRevolutUpsell,
    TriggerSuccess,
  } = setup()

  const promise = RevolutUpsell({
    mode: 'sandbox',
    publicToken: 'MERCHANT_PUBLIC_TOKEN_SANDBOX_XXX',
  })
  const spyLoad = jest.spyOn(script, 'onload')

  expect(script).toHaveAttribute('id', 'revolut-upsell')
  expect(script).toHaveAttribute(
    'src',
    'https://sandbox-merchant.revolut.com/upsell/embed.js'
  )

  TriggerSuccess()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockUpsellInstance)
  expect(MockRevolutUpsell).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_SANDBOX_XXX',
  })
})

test('should not request new embed script and use loaded one', async () => {
  const { RevolutUpsell, MockRevolutUpsell, TriggerSuccess } = setup()

  const promise = RevolutUpsell({ publicToken: 'MERCHANT_PUBLIC_TOKEN_1' })

  TriggerSuccess()

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
    script,
    RevolutUpsell,
    MockUpsellInstance,
    MockRevolutUpsell,
    TriggerSuccess,
  } = setup()

  const promise = RevolutUpsell({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
  })
  const spyLoad = jest.spyOn(script, 'onload')

  expect(script).toHaveAttribute('id', 'revolut-upsell')
  expect(script).toHaveAttribute(
    'src',
    'https://merchant.revolut.com/upsell/embed.js'
  )

  TriggerSuccess()

  const instance = await promise

  expect(spyLoad).toHaveBeenCalled()
  expect(instance).toBe(MockUpsellInstance)
  expect(MockRevolutUpsell).toHaveBeenCalledWith({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
  })
})

test('should throw error on failed loading', async () => {
  expect.assertions(1)

  const { RevolutUpsell, TriggerError } = setup()

  try {
    const promise = RevolutUpsell({
      publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
    })

    TriggerError()

    await promise
  } catch (error) {
    expect(error.message).toBe(
      `'RevolutUpsell' failed to load: Network error encountered`
    )
  }
})

test('should throw error if RevolutCheckout is missing', async () => {
  const { script, RevolutUpsell, TriggerSuccess } = setup()

  const promise = RevolutUpsell({
    publicToken: 'MERCHANT_PUBLIC_TOKEN_PROD_XXX',
  })

  expect(script).toHaveAttribute('id', 'revolut-upsell')
  expect(script).toHaveAttribute(
    'src',
    'https://merchant.revolut.com/upsell/embed.js'
  )

  TriggerSuccess.mockImplementationOnce(() => {
    // RevolutUpsell is not assigned to window
    fireEvent.load(script)
  })
  TriggerSuccess()

  await expect(promise).rejects.toEqual(
    new Error(`'RevolutUpsell' failed to load: RevolutUpsell is not a function`)
  )
})
