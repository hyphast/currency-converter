export function debounce(foo: Function, ms: number) {
  let timer: ReturnType<typeof setTimeout>
  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      foo.apply(this, args)
    }, ms)
  }
}
