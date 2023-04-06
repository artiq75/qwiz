import {
  createMachine,
  guard,
  immediate,
  invoke,
  reduce,
  state,
  transition
} from 'robot3'
import { findRandomQuestion } from '../api/question'

const defaulCtx = {
  round: 1,
  limit: 3,
  question: null,
  loading: true
}

const findQuestion = async () => {
  return findRandomQuestion()
}

const loadingDoneReduce = (ctx, e) => ({
  ...ctx,
  question: e.data,
  loading: false,
  round: ctx.round + 1
})

const choosePlayReduce = (ctx) => ({
  ...ctx,
  loading: true
})

const canPlay = (ctx) => ctx.round && ctx.round <= ctx.limit

const GameMachine = createMachine(
  {
    loading: invoke(
      findQuestion,
      transition('done', 'play', reduce(loadingDoneReduce)),
      transition('error', 'loading')
    ),
    play: state(transition('choose', 'choose')),
    choose: state(
      immediate(
        'end',
        guard((ctx) => !canPlay(ctx))
      ),
      transition('play', 'loading', guard(canPlay), reduce(choosePlayReduce))
    ),
    end: state(transition('replay', 'play'))
  },
  (ctx) => ({ ...ctx, ...defaulCtx })
)

export default GameMachine