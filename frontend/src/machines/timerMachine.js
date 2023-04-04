import {
  createMachine,
  guard,
  immediate,
  invoke,
  reduce,
  state,
  transition
} from 'robot3'

const canStart = (ctx) =>
  (ctx.timer && ctx.timer === ctx.start) || ctx.timer > 0

const decrement = (ctx) => ({ ...ctx, timer: ctx.timer - 1 })

let timeoutID = null

const canContinue = async (ctx) =>
  new Promise((res, rej) => {
    if (ctx.timer > 0) {
      clearTimeout(timeoutID)
      timeoutID = null
      timeoutID = setTimeout(() => {
        res()
      }, 1000)
    } else {
      rej()
    }
  })

const resetReducer = (ctx) => ({ ...ctx, timer: ctx.start })

const timerMachine = createMachine(
  {
    stop: state(transition('start', 'start', reduce(resetReducer))),
    start: invoke(
      canContinue,
      transition('done', 'start', reduce(decrement)),
      transition('error', 'stop')
    )
  },
  (ctx) => ({ ...ctx, timer: ctx.start ?? 30 })
)

export default timerMachine
