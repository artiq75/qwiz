import { useEffect } from 'react'

export default function useAsyncEffect(fn, deps = []) {
  useEffect(() => {
    fn()
  }, deps)
}
