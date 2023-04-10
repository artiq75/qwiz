const defaultScore = {
  goodAnswer: 0,
  badAnswer: 0,
  attempt: 0
}

export const loadingDoneReduce = (ctx, e) => {
  return {
    ...ctx,
    question: e.data,
    loading: false,
    round: ctx.round + 1
  }
}

export const playReduce = (ctx, e) => {
  return {
    ...ctx,
    loading: true,
    scores: e.scores
  }
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
