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
  lobbyReduce,
  resetReduce
} from './GameActions'
import { findAllScore } from '../api/score'
import { isAuth } from '../api/auth'

export const defaultCtx = {
  round: 0,
  limit: 3,
  question: null,
  loading: true,
  score: {},
  gameScores: [],
  scores: [],
  category: null
}

const canPlay = (ctx) => ctx.round && ctx.round < ctx.limit
const cantPlay = (ctx) => !canPlay(ctx)

const asyncInit = async (ctx) => {
  if (!isAuth()) return []
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
      transition('leave', 'lobby', reduce(resetReduce))
    ),
    choose: state(
      immediate('end', guard(cantPlay)),
      transition('play', 'loading', guard(canPlay), reduce(playReduce)),
      transition('leave', 'lobby', reduce(resetReduce))
    ),
    end: state(transition('replay', 'lobby', reduce(resetReduce)))
  },
  (ctx) => ({ ...defaultCtx, ...ctx })
)

export default GameMachine
