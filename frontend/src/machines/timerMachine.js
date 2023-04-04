import {
  createMachine,
  guard,
  immediate,
  invoke,
  reduce,
  state,
  transition
} from 'robot3'

const canStart = (ctx) => ctx.timer && ctx.timer === ctx.start

const decrement = (ctx) => ({ ...ctx, timer: ctx.timer - 1 })

const canContinue = async (ctx) =>
  new Promise((res, rej) => {
    if (ctx.count > 0) {
      setTimeout(() => {
        res()
      }, 1000)
    } else {
      rej()
    }
  })

const timerMachine = createMachine(
  {
    stop: state(
      // immediate('start', guard(canStart)),
      transition('start', 'start')
    ),
    start: state(
      // transition('done', 'start', reduce(decrement)),
      transition('stop', 'stop')
    )
  },
  (ctx) => ({ ...ctx, timer: ctx.start })
)

export default timerMachine
