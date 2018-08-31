import React from 'react'
import PropTypes from 'prop-types'

import Timer, { formatTime } from '../Timer/Timer'
import styles from './Messenger.scss'

// This will display the title of the game when the menu is visisble
// This will display the next instruction when the game is in progress
//      select first card, select second card, you got a match, you did not get a match, etc...
// This will display when the game has been won along with the final time/score

const getMessage = (function() {
  const messages = {
    true: 'Memory Card Game',
    1: 'Select your first card',
    0: 'Select your second card',
  }
  return function(count) {
    return messages[!count || count % 2]
  }
})()

const ShowTimer = ({ count }) => (count > 0 ? <Timer /> : formatTime(-1))

const Messenger = ({ count }) => (
  <div className={styles.Messenger}>
    <h1 aria-live="assertive" className={styles.Messenger}>
      {getMessage(count)}
    </h1>
    <ShowTimer count={count} />
  </div>
)

Messenger.propTypes = {
  count: PropTypes.number,
}

export default Messenger
