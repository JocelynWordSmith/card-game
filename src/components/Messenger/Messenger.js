import React from 'react'
import PropTypes from 'prop-types'

import Timer, { formatTime } from '../Timer/Timer'
import styles from './Messenger.scss'

import { events } from '../../utilities/agnostic'

const turnCountNameSpace = 'cardClicked'
const startGameNamespace = 'gameStart'
const endGameNamespace = 'gameEnd'
const messages = {
  title: 'Memory Card Game',
  round1: 'Select your first card',
  round2: 'Select your second card',
  victory: 'Congratulations!',
}

// This will display the title of the game when the menu is visisble
// This will display the next instruction when the game is in progress
//      select first card, select second card, you got a match, you did not get a match, etc...
// This will display when the game has been won along with the final time/score

const ShowTimer = ({ turns }) => (turns > 0 ? <Timer /> : formatTime(-1))

class Messenger extends React.Component {
  constructor(props) {
    super(props)
    this.state = { turns: 0, gameStart: false, gameEnd: false }

    events.sub(turnCountNameSpace, turnData => {
      this.setState({ turns: turnData.turns })
    })
    events.sub(startGameNamespace, gameStart => {
      this.setState({ gameStart })
    })
    events.sub(endGameNamespace, gameEnd => {
      this.setState({ gameEnd })
    })
  }
  getMessage() {
    const { turns, gameStart, gameEnd } = this.state
    if (!gameStart) return messages.title
    if (gameEnd) return messages.victory
    if (turns % 2 === 0) return messages.round1
    if (turns % 2 === 1) return messages.round2
  }
  render() {
    const { turns } = this.state
    return (
      <div className={styles.Messenger}>
        <h1 aria-live="assertive" className={styles.Messenger}>
          {this.getMessage(turns)}
        </h1>
        <ShowTimer turns={turns} />
      </div>
    )
  }
}

Messenger.propTypes = {
  turns: PropTypes.number,
}

export default Messenger
