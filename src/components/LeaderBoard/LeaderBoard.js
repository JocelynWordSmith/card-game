import React from 'react'
import { get, del } from 'idb-keyval'

import LeaderBoardTables from './LeaderBoardTables'
import { mapIdToArr } from '../../utilities/utilities'
import { dbKey } from '../../utilities/copyConfig'
import styles from './LeaderBoard.scss'

const processDisplayScores = scores => {
  const displayScores = {}

  Object.keys(scores).forEach(key => {
    const orderedScores = scores[key].sort((a, b) => a.turns - b.turns)
    const processedScores = mapIdToArr(orderedScores)
    displayScores[key] = processedScores
  })

  return displayScores
}

const LeaderBoardHeader = ({ sectionHeader, clearText, clearBoard }) => (
  <div>
    <h2>{sectionHeader}</h2>
    <button type="button" onClick={clearBoard}>
      {clearText}
    </button>
    <hr />
  </div>
)

class LeaderBoard extends React.Component {
  constructor(props) {
    super(props)
    const clearBoard = this.clearBoard.bind(this)
    this.state = {
      scores: {},
      sectionHeader: 'Leaderboards:',
      clearText: 'Clear Leaderboard',
      text: {
        c1: 'Rank',
        c2: 'Name',
        c3: 'Time',
        c4: 'Turns',
      },
      clearBoard,
    }
  }
  clearBoard() {
    del(dbKey)
      .then(() => {
        this.setState({ scores: {} })
      })
      .catch(() => {
        this.setState({ scores: {} })
      })
  }
  componentDidMount() {
    get(dbKey)
      .then(scores => {
        const displayScores = processDisplayScores(scores)
        this.setState({ scores: displayScores })
      })
      .catch(() => {
        this.setState({ scores: {} })
      })
  }

  render() {
    return (
      <section className={styles.LeaderBoard}>
        <LeaderBoardHeader {...this.state} />
        <LeaderBoardTables {...this.state} />
      </section>
    )
  }
}

export default LeaderBoard
