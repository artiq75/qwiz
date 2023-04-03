import { useEffect, useRef, useState } from 'react'

export default function useTimer(initial = 30) {
  const [count, setCount] = useState(initial)
  const intervalID = useRef(null)

  useEffect(() => {
    start()
    return () => stop()
  }, [])

  const start = function () {
    intervalID.current = setInterval(() => {
      setCount((c) => c - 1)
    }, 1000)
  }

  const stop = function () {
    clearInterval(intervalID.current)
    intervalID.current = null
  }

  const reset = function () {
    stop()
    setCount(initial)
  }

  const reload = function () {
    reset()
    start()
  }

  return [count, start, stop, reset, reload]
}
