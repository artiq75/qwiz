import * as ApiScore from '../api/score'
import { defaultCtx } from './GameMachine'

const defaultScore = {
  goodAnswer: 0,
  badAnswer: 0,
  attempt: 0
}

export const resetReduce = (ctx) => {
  return { ...defaultCtx, scores: ctx.scores, gameScores: ctx.gameScores }
}

export const initReduce = (ctx, { data }) => {
  return { ...ctx, ...defaultCtx, scores: data }
}

export const lobbyReduce = (ctx, { limit, category }) => {
  return { ...ctx, limit: limit ?? ctx.limit, category }
}

export const loadingDoneReduce = (ctx, { data }) => {
  return {
    ...ctx,
    question: data,
    loading: false,
    round: ctx.round + 1
  }
}

export const playReduce = (ctx) => {
  return {
    ...ctx,
    loading: true
  }
}

export const chooseAction = async (ctx) => {
  const oldScore = ctx.scores.find(
    (s) => s.category.id === ctx.score.category.id
  )
  const newScore = { ...oldScore, ...ctx.score }
  newScore.goodAnswer += oldScore.goodAnswer
  newScore.badAnswer += oldScore.badAnswer
  newScore.attempt += oldScore.attempt
  // Mise à jour du score dans la DB
  const updatedScore = await ApiScore.updateScore(newScore)
  // On modifie le score actuelle avec le nouveau score
  ctx.scores = ctx.scores.map((score) => {
    if (score.id !== updatedScore.id) return score
    return updatedScore
  })
}

export const chooseReduce = (ctx, e) => {
  // On récupère le score si il existe sinon on créer un nouveau
  const score = ctx.gameScores.find(
    (s) => s.category.id === ctx.question.category.id
  ) ?? { ...defaultScore, category: ctx.question.category }

  ctx.score = { ...defaultScore, category: ctx.question.category }

  // Si la réponse est valide
  if (e?.answer?.isValid) {
    score.goodAnswer += 1
    ctx.score.goodAnswer += 1
  }

  // Si la reponse est invalide ou qu'il n'a pas cliquer
  if (!e?.answer?.isValid || !e?.isClicked) {
    score.badAnswer += 1
    ctx.score.badAnswer += 1
  }

  if (e?.isClicked) {
    score.attempt += 1
    ctx.score.attempt += 1
  }

  let gameScores = []

  // On vérifie si le score existe sinon on l'ajoute
  if (ctx.gameScores.some((s) => s.category.id === score.category.id)) {
    // On modifie le score
    gameScores = ctx.gameScores.map((s) => {
      if (s.category.id !== score.category.id) return s
      return score
    })
  } else {
    gameScores = [...ctx.gameScores, score]
  }

  return {
    ...ctx,
    gameScores,
    score: ctx.score
  }
}
