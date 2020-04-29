# 💳 [`RevolutCheckout.js`](https://developer.revolut.com/docs/merchant-api/#revolutcheckout-js-reference-revolutcheckout)

[![](https://flat.badgen.net/npm/v/@revolut/checkout?cache=600)](https://www.npmjs.com/package/@revolut/checkout) [![](https://flat.badgen.net/bundlephobia/minzip/@revolut/checkout?cache=600)](https://bundlephobia.com/result?p=@revolut/checkout)

## Install

<pre>
<a href="https://www.npmjs.com">npm</a> install @revolut/checkout
</pre>

<pre>
<a href="https://yarnpkg.com">yarn</a> add @revolut/checkout
</pre>

## Usage

### `RevolutCheckout`

```js
import RevolutCheckout from '@revolut/checkout'

RevolutCheckout('TOKEN_XXX', 'prod').then((instance) => {
  // Work with instance:

  // instance.payWithPopup()
  // instance.createCardField()
  // ...
})
```

For more information read our [official documentation](https://developer.revolut.com/docs/merchant-api/#revolutcheckout-js-reference).


### TypeScript support

Following types are availble for import:

```ts
import {
  ValidationErrorType,
  ValidationError,
  RevolutCheckoutErrorType,
  RevolutCheckoutError,
  FieldStatus,
  FieldClasses,
  FieldStyles,
  RevolutCheckoutCardField,
  RevolutCheckoutInstance,
} from '@revolut/checkout'
```

---
© 2020 Revolut Ltd
