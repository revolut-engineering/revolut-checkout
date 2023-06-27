import { fireEvent } from '@testing-library/dom'

export function triggerScriptOnLoad(name: string) {
  const script = document.querySelector(`script[src*="${name}"]`)
  if (!script) {
    throw new Error(
      `Script with source containing "${name}" was not found in the document`
    )
  }

  fireEvent.load(script)
}

export function triggerScriptOnError(name: string) {
  const script = document.querySelector(`script[src*="${name}"]`)
  if (!script) {
    throw new Error(
      `Script with source containing "${name}" was not found in the document`
    )
  }

  fireEvent.error(script)
}

export function settleVersionScript<T extends any[]>(
  settledCallback: (...args: T) => void,
  ...params: T
) {
  return new Promise((resolve) => {
    setTimeout(() => {
      settledCallback(...params)

      // Resolve only when embed is injected as we are attaching listeners to the script element
      // Since version script load errors are ignored, embed is being injected for both onload and onerror
      const observer = new MutationObserver(() => {
        if (document.querySelector('script[src*="embed.js"]')) {
          observer.disconnect()
          resolve()
        }
      })

      observer.observe(document, {
        childList: true,
        subtree: true,
      })
    })
  })
}
