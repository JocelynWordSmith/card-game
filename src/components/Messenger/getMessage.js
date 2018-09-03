import React from 'react'

import { events } from '../../utilities/utilities'

const restartNamespace = 'newGame'
const messages = {
  title: 'Memory Card Game',
  round1: (sign, match) => {
    const isMatch = `It was ${match ? '' : 'not'} a match`
    const isSign = sign ? `You selected a ${sign}. ${isMatch}. ` : ''
    return `${isSign}Select a card`
  },
  round2: sign => `You selected a ${sign}. Select your second card`,
  challenge: 'Think you can do better?',
  restart: 'Click here to restart the game',
  victory: (time, turns) =>
    `Congratulations! You have beaten the game in ${time} with just ${turns} turns!`,
}

const wipeMemoryGame = () => {
  events.pub(restartNamespace, true)
}

const RestartButton = ({ text }) => <button onClick={wipeMemoryGame}>{text}</button>

const EndGameMsg = ({ time, turns }) => {
  const { victory, challenge, restart } = messages
  return (
    <div>
      <p>{victory(time, turns)}</p>
      {challenge} <RestartButton text={restart} />
    </div>
  )
}

const getMessage = ({ turns, gameStart, gameEnd, time, sign, match }) => {
  const { title, round1, round2 } = messages
  if (!gameStart) return title
  if (gameEnd) return EndGameMsg({ time, turns })
  if (turns % 2 === 0) return round1(sign, match)
  return round2(sign)
}

export default getMessage
