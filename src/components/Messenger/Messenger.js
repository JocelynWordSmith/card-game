import React from 'react'
import PropTypes from 'prop-types'

import TimerContainer, { formatTime } from '../Timer/Timer'
import { keygen, events } from '../../utilities/utilities'
import {
  turnCountNameSpace,
  startGameNamespace,
  endGameNamespace,
  difficultySetting,
} from '../../utilities/copyConfig'
import GetMessages from './GetMessages'
import styles from './Messenger.scss'

// This will display the title of the game when the menu is visisble
// This will display the next instruction when the game is in progress
//      select first card, select second card, you got a match, you did not get a match, etc...
// This will display when the game has been won along with the final time/score

const ShowTimer = ({ turns, timerNamepace }) =>
  turns > 0 ? <TimerContainer timerNamepace={timerNamepace} /> : formatTime(-1)

class Messenger extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      turns: 0,
      timerNamespace: `timer${keygen()}`,
      time: formatTime(-1),
    }
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

  subTime() {
    const { timerNamespace } = this.state
    return events.sub(timerNamespace, time => {
      this.setState({ time: formatTime(time) })
    })
  }

  subDifficulty() {
    return events.sub(difficultySetting, difficulty => {
      this.setState({ difficulty })
    })
  }

  componentDidMount() {
    this.subs = [this.subCount(), this.subStart(), this.subEnd(), this.subTime()]
  }

  componentWillUnmount() {
    this.subs.forEach(fn => fn())
  }

  render() {
    const { turns, timerNamespace } = this.state

    return (
      <div className={styles.Messenger}>
        <h1 aria-live="polite" className={styles.Messenger}>
          {GetMessages(this.state)}
        </h1>
        <ShowTimer timerNamepace={timerNamespace} turns={turns} />
      </div>
    )
  }
}

Messenger.propTypes = {
  turns: PropTypes.number,
}

export default Messenger
