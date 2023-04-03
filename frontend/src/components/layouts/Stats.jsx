import { memo } from 'react'
import StatsItem from '../StatsItem'

const Stats = memo(({ scores }) => {
  return (
    <div className="stats-items">
      {scores?.map((score) => (
        <StatsItem score={score} />
      ))}
    </div>
  )
})

export default Stats
