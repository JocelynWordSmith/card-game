import React from 'react'
import PropTypes from 'prop-types'

import EndGameMsg from './EndGameMsg'

const messages = {
  title: 'Memory Card Game',
  challenge: 'Think you can do better?',
  restart: 'Click here to restart the game',
}

const dynamicMessages = {
  round1: ({ sign, match }) => {
    const isMatch = `It was ${match ? '' : 'not'} a match`
    const isSign = sign ? `You selected a ${sign}. ${isMatch}. ` : ''
    return `${isSign}Select a card`
  },
  round2: ({ sign }) => `You selected a ${sign}. Select your second card`,
}

const GetMessages = props => {
  const { turns, gameStart, gameEnd } = props
  const { title } = messages
  const { round1, round2 } = dynamicMessages

  if (!gameStart) return title
  if (gameEnd) return <EndGameMsg {...props} messages={messages} />
  if (turns % 2 === 0) return round1(props)
  return round2(props)
}

GetMessages.propTypes = {
  turns: PropTypes.string,
  gameStart: PropTypes.bool,
  gameEnd: PropTypes.bool,
}

export default GetMessages
