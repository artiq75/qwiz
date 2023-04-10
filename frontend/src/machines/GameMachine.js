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
import { playReduce, chooseReduce, loadingDoneReduce } from './GameReduces'
import * as ApiScore from '../api/score'

const defaultCtx = {
  round: 1,
  limit: 3,
  question: null,
  loading: true,
  score: {},
  gameScores: [],
  scores: []
}

const canPlay = (ctx) => ctx.round && ctx.round <= ctx.limit

const updateScores = async (ctx) => {
  for (const score of ctx.gameScores) {
    // On récupère le score stocker dans la DB
    const oldScore = ctx.scores.find((s) => s.category.id === score.category.id)
    const newScore = { id: oldScore.id, ...score }
    newScore.goodAnswer += oldScore.goodAnswer
    newScore.badAnswer += oldScore.badAnswer
    newScore.attempt += oldScore.attempt
    // Mise à jour du score dans la DB
    await ApiScore.updateScore(newScore)
  }
}

const GameMachine = createMachine(
  {
    lobby: state(
      immediate(
        'loading',
        reduce((ctx) => ({ ...ctx, defaultCtx }))
      )
    ),
    loading: invoke(
      findRandomQuestion,
      transition('done', 'play', reduce(loadingDoneReduce)),
      transition('error', 'loading')
    ),
    play: state(transition('choose', 'choose', reduce(chooseReduce))),
    choose: state(
      immediate(
        'end',
        guard((ctx) => !canPlay(ctx))
      ),
      transition('play', 'loading', guard(canPlay), reduce(playReduce))
    ),
    end: invoke(updateScores, transition('replay', 'lobby'))
  },
  (ctx) => ({ ...ctx, ...defaultCtx })
)

export default GameMachine
