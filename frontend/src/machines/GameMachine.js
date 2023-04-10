import {
  action,
  createMachine,
  guard,
  immediate,
  invoke,
  reduce,
  state,
  transition
} from 'robot3'
import { findRandomQuestion } from '../api/question'
import {
  playReduce,
  chooseReduce,
  loadingDoneReduce,
  chooseAction,
  initReduce
} from './GameActions'

export const defaultCtx = {
  round: 1,
  limit: 3,
  question: null,
  loading: true,
  score: {},
  gameScores: [],
  scores: []
}

const canPlay = (ctx) => ctx.round && ctx.round <= ctx.limit
const cantPlay = (ctx) => !canPlay(ctx)

const GameMachine = createMachine(
  {
    lobby: state(transition('run', 'loading', reduce(initReduce))),
    loading: invoke(
      findRandomQuestion,
      transition('done', 'play', reduce(loadingDoneReduce)),
      transition('error', 'loading')
    ),
    play: state(
      transition('choose', 'choose', reduce(chooseReduce), action(chooseAction))
    ),
    choose: state(
      immediate('end', guard(cantPlay)),
      transition('play', 'loading', guard(canPlay), reduce(playReduce))
    ),
    end: state(transition('replay', 'lobby'))
  },
  (ctx) => ({ ...defaultCtx, ...ctx })
)

export default GameMachine
