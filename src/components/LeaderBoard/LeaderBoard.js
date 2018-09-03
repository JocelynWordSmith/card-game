import React from 'react'
import { get } from 'idb-keyval'

import LeaderBoardTable from './LeaderBoardTable'
import { mapIdToArr } from '../../utilities/utilities'
import { dbKey } from '../../utilities/copyConfig'
import styles from './LeaderBoard.scss'

class LeaderBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scores: [],
      text: {
        tableCaption: 'Leaderboard:',
        c1: 'Rank',
        c2: 'Name',
        c3: 'Time',
        c4: 'Turns',
      },
    }
  }
  componentDidMount() {
    get(dbKey)
      .then(scores => {
        const orderedScores = scores.sort((a, b) => a.turns - b.turns)
        const processedScores = mapIdToArr(orderedScores)
        this.setState({ scores: processedScores })
      })
      .catch(() => {
        this.setState({ scores: [] })
      })
  }

  render() {
    return (
      <section className={styles.LeaderBoard}>
        <LeaderBoardTable {...this.state} />
      </section>
    )
  }
}

export default LeaderBoard
