import { memo, useEffect, useState } from 'react'
import StatsItem from '../StatsItem'

const Stats = memo(({ scores }) => {
  const [total, setTotal] = useState({
    category: {
      title: 'Total'
    },
    goodAnswer: 0,
    badAnswer: 0,
    attempt: 0
  })

  useEffect(() => {
    // TODO: corriger le problème de duplication du calcul
    for (const score of scores) {
      total.goodAnswer += score.goodAnswer
      total.badAnswer += score.badAnswer
      total.attempt += score.attempt
    }
    setTotal({ ...total })
  }, [scores])

  return (
    <div className="stats-items">
      <StatsItem score={total} />
      {scores?.map((score, i) => (
        <StatsItem key={i} score={score} />
      ))}
    </div>
  )
})

export default Stats
