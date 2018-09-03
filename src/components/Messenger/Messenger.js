import React from 'react'
import PropTypes from 'prop-types'

import TimerContainer, { formatTime } from '../Timer/Timer'
import { keygen, events } from '../../utilities/utilities'
import getMessage from './getMessage'
import styles from './Messenger.scss'

const turnCountNameSpace = 'cardClicked'
const startGameNamespace = 'gameStart'
const endGameNamespace = 'gameEnd'

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
      gameStart: false,
      gameEnd: false,
      timerNamespace: `timer${keygen()}`,
      time: formatTime(-1),
    }
  }

  componentDidMount() {
    const { timerNamespace } = this.state
    this.subs = [
      events.sub(turnCountNameSpace, turnData => this.setState({ turns: turnData.turns })),
      events.sub(startGameNamespace, gameStart => this.setState({ gameStart })),
      events.sub(endGameNamespace, gameEnd => this.setState({ gameEnd })),
      events.sub(timerNamespace, time => this.setState({ time: formatTime(time) })),
    ]
  }

  componentWillUnmount() {
    this.subs.forEach(fn => fn())
  }

  render() {
    const { turns, timerNamespace } = this.state

    return (
      <div className={styles.Messenger}>
        <h1 aria-live="assertive" className={styles.Messenger}>
          {getMessage(this.state)}
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
