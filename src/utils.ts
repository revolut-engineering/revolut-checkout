const pendingScripts: {
  [url: string]: Promise<HTMLScriptElement> | undefined
} = {}

type ScriptParams = {
  src: string
  id: string
  name: string
}

export function loadScript({ src, id, name }: ScriptParams) {
  if (pendingScripts[src]) {
    return pendingScripts[src]
  }

  const script = document.createElement('script')

  script.id = id
  script.src = src
  script.async = true

  const promise = new Promise<HTMLScriptElement>((resolve, reject) => {
    function handleError(reason: string) {
      document.head.removeChild(script)
      delete pendingScripts[src]

      reject(new Error(`'${name}' failed to load: ${reason}`))
    }

    function handleLoad() {
      resolve(script)
    }

    script.onload = handleLoad
    script.onerror = () => handleError('Network error encountered')
  })

  document.head.appendChild(script)
  pendingScripts[src] = promise

  return promise
}

export function getVersionedUrl(url: string, version: string): string {
  const queryParams = version ? new URLSearchParams({ version }).toString() : ''
  return `${url}${queryParams ? `?${queryParams}` : ''}`
}
