import React from 'react'
import PropTypes from 'prop-types'

import EndGameMsg from './EndGameMsg'
import { messages, dynamicMessages } from '../../assets/content/config'

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
