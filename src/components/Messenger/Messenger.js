import React from 'react'
import PropTypes from 'prop-types'

import TimerContainer, { formatTime } from '../Timer/Timer'
import { events } from '../../utilities/utilities'
import {
  turnCountNameSpace,
  startGameNamespace,
  endGameNamespace,
} from '../../utilities/copyConfig'
import GetMessages from './GetMessages'
import styles from './Messenger.scss'
import tStyles from '../Timer/Timer.scss'

// This will display the title of the game when the menu is visisble
// This will display the next instruction when the game is in progress
//      select first card, select second card, you got a match, you did not get a match, etc...
// This will display when the game has been won along with the final time/score

const ShowTimer = ({ turns, shareTime }) => {
  if (turns > 0) return <TimerContainer shareTime={shareTime} />
  return <div className={tStyles.Timer}>{formatTime(-1)}</div>
}

const LiveHeader = props => (
  <h1 aria-live="polite" className={styles.LiveHeader}>
    {props.children}
  </h1>
)

class Messenger extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      turns: 0,
      time: formatTime(-1),
      difficulty: this.props.difficulty,
    }
    this.shareTime = this.shareTime.bind(this)
  }

  subCount() {
    return events.sub(turnCountNameSpace, turnData => {
      const { turns, sign, match } = turnData
      return this.setState({ turns, sign, match })
    })
  }

  subStart() {
    return events.sub(startGameNamespace, gameStart =>
      this.setState({ gameStart: !!gameStart, player: gameStart })
    )
  }

  subEnd() {
    return events.sub(endGameNamespace, gameEnd => {
      this.setState({ gameEnd })
    })
  }

  shareTime(time) {
    this.setState({ time })
  }

  componentDidMount() {
    this.subs = [this.subCount(), this.subStart(), this.subEnd()]
  }

  componentWillUnmount() {
    this.subs.forEach(fn => fn())
  }

  render() {
    const { turns } = this.state

    return (
      <div className={styles.Messenger}>
        <LiveHeader>{GetMessages(this.state)}</LiveHeader>
        <ShowTimer shareTime={this.shareTime} turns={turns} />
      </div>
    )
  }
}

Messenger.propTypes = {
  turns: PropTypes.number,
}

export default Messenger
