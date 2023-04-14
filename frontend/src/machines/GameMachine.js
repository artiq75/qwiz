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
  initReduce,
  lobbyReduce
} from './GameActions'
import { findAllScore } from '../api/score'

export const defaultCtx = {
  round: 1,
  limit: 3,
  question: null,
  loading: true,
  score: {},
  gameScores: [],
  scores: [],
  category: null
}

const canPlay = (ctx) => ctx.round && ctx.round <= ctx.limit
const cantPlay = (ctx) => !canPlay(ctx)

const asyncInit = async (ctx) => {
  return findAllScore()
}

const findQuestion = async ({ category }) => {
  return await findRandomQuestion({ category })
}

const GameMachine = createMachine(
  {
    init: invoke(asyncInit, transition('done', 'lobby', reduce(initReduce))),
    lobby: state(transition('run', 'loading', reduce(lobbyReduce))),
    loading: invoke(
      findQuestion,
      transition('done', 'play', reduce(loadingDoneReduce)),
      transition('error', 'loading')
    ),
    play: state(
      transition(
        'choose',
        'choose',
        reduce(chooseReduce),
        action(chooseAction)
      ),
      transition('leave', 'lobby')
    ),
    choose: state(
      immediate('end', guard(cantPlay)),
      transition('play', 'loading', guard(canPlay), reduce(playReduce)),
      transition('leave', 'lobby')
    ),
    end: state(transition('replay', 'lobby'))
  },
  (ctx) => ({ ...defaultCtx, ...ctx })
)

export default GameMachine
