type ModuleParams = {
  url: string
  id: string
  name: string
}

export function loadModule({ url, id, name }: ModuleParams) {
  const script = document.createElement('script')

  script.id = id
  script.src = url
  script.async = true

  document.head.appendChild(script)

  return new Promise<HTMLScriptElement>((resolve, reject) => {
    function handleError(reason: string) {
      document.head.removeChild(script)

      reject(new Error(`'${name}' failed to load: ${reason}`))
    }

    function handleLoad() {
      resolve(script)
    }

    script.onload = handleLoad
    script.onerror = () => handleError('Network error encountered')
  })
}
