import React from 'react'
import PropTypes from 'prop-types'

import TimerContainer, { formatTime } from '../Timer/Timer'
import { events } from '../../utilities/utilities'
import {
  turnCountNameSpace,
  startGameNamespace,
  endGameNamespace,
  timerLabel,
} from '../../assets/content/config'
import GetMessages from './GetMessages'
import styles from './Messenger.scss'

// This will display the title of the game when the menu is visisble
// This will display the next instruction when the game is in progress
//      select first card, select second card, you got a match, you did not get a match, etc...
// This will display when the game has been won along with the final time/score

const ShowTimer = ({ turns, shareTime }) => {
  if (turns > 0)
    return (
      <div className={styles.time}>
        {timerLabel} <TimerContainer shareTime={shareTime} />
      </div>
    )
  return <div />
  // return <div className={tStyles.Timer}>{formatTime(-1)}</div>
}

ShowTimer.propTypes = {
  turns: PropTypes.number,
  shareTime: PropTypes.func,
}

const LiveHeader = props => (
  <h1 aria-live="polite" className={styles.LiveHeader}>
    {props.children}
    <ShowTimer shareTime={props.shareTime} turns={props.turns} />
  </h1>
)

LiveHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

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
      this.setState({ turns, sign, match })
    })
  }

  subStart() {
    // unsubs after first pub
    const unsub = events.sub(startGameNamespace, gameStart => {
      this.setState({ gameStart: !!gameStart, player: gameStart })
      unsub()
    })
  }

  subEnd() {
    // unsubs after first pub
    const unsub = events.sub(endGameNamespace, gameEnd => {
      this.setState({ gameEnd })
      unsub()
    })
  }

  shareTime(time) {
    this.setState({ time })
  }

  componentDidMount() {
    this.subCount()
    // subStart will clear itself
    this.subStart()
    // subEnd will clear itself
    this.subEnd()
  }

  componentWillUnmount() {
    this.subCount()
  }

  render() {
    const { turns } = this.state

    return (
      <div className={styles.Messenger}>
        <LiveHeader shareTime={this.shareTime} turns={turns}>
          {GetMessages(this.state)}
        </LiveHeader>
      </div>
    )
  }
}

Messenger.propTypes = {
  difficulty: PropTypes.func,
}

export default Messenger
