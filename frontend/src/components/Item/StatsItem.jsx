import { memo } from 'react'

const StatsItem = memo(({ score }) => {
  return (
    <>
      <h3 className="stats-title">{score.category.title}</h3>
      <div className="stats-item">
        <div className="stats-card">
          <h4>{score.goodAnswer}</h4>
          <p>Bonne Réponse</p>
        </div>
        <div className="stats-card">
          <h4>{score.badAnswer}</h4>
          <p>Mauvaise Réponse</p>
        </div>
        <div className="stats-card">
          <h4>{score.attempt}</h4>
          <p>Essaie</p>
        </div>
      </div>
    </>
  )
})

export default StatsItem
