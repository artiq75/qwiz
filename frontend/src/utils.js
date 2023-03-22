export function asyncUseEffect(fn) {
  ;(async function () {
    fn()
  })()
}
