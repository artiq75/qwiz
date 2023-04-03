import { memo } from 'react'
import StatsItem from '../StatsItem'

const Stats = memo(({ scores }) => {
  return (
    <div className="stats-items">
      {scores?.map((score, i) => (
        <StatsItem key={i} score={score} />
      ))}
    </div>
  )
})

export default Stats
