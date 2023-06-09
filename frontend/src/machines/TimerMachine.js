import { createMachine, invoke, reduce, state, transition } from 'robot3'

// const canStart = (ctx) =>
//   (ctx.timer && ctx.timer === ctx.start) || ctx.timer > 0

const decrementReducer = (ctx) => {
  clearTimeout(timeoutID)
  timeoutID = null
  return { ...ctx, timer: ctx.timer - 1 }
}

let timeoutID = null

const canContinue = async (ctx) =>
  new Promise((res, rej) => {
    if (ctx.timer > 0) {
      timeoutID = setTimeout(() => {
        res()
      }, 1000)
    } else {
      rej()
    }
  })

const resetReducer = (ctx) => ({ ...ctx, timer: ctx.start })

const resetTimerReducer = (ctx) => {
  clearTimeout(timeoutID)
  timeoutID = null
  return { ...ctx, timer: ctx.start }
}

const TimerMachine = createMachine(
  {
    stop: state(transition('start', 'start', reduce(resetReducer))),
    start: invoke(
      canContinue,
      transition('done', 'start', reduce(decrementReducer)),
      transition('error', 'stop'),
      transition('stop', 'stop', reduce(resetTimerReducer))
    )
  },
  (ctx) => ({ ...ctx, timer: ctx.start ?? 30 })
)

export default TimerMachine
