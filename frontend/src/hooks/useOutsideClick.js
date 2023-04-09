import { useEffect } from "react"

/**
 * Hook d'effet pour détecter le clique en dehors d'un élément
 */
export default function useOutsideClick(ref, cb) {
  useEffect(() => {
    if (cb === null) {
      return
    }
    const escCb = (e) => {
      if (e.key === 'Escape' && ref.current) {
        cb()
      }
    }
    const clickCb = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        cb()
      }
    }
    document.addEventListener('click', clickCb)
    document.addEventListener('keyup', escCb)
    return function cleanup() {
      document.removeEventListener('click', clickCb)
      document.removeEventListener('keyup', escCb)
    }
  }, [ref, cb])
}
