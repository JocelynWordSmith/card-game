import React from 'react'

import { get, set } from 'idb-keyval'
import { events } from '../../utilities/utilities'
import { dbKey, restartNamespace } from '../../utilities/copyConfig'

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
  victory: (time, turns, player) =>
    `Congratulations ${player}! You have beaten the game in ${time} with just ${turns} turns!`,
}

class RestartButton extends React.Component {
  constructor(args) {
    super(args)
    this.wipeMemoryGame = this.wipeMemoryGame.bind(this)
    this.saveScore()
  }

  saveScore() {
    const { score } = this.props
    get(dbKey)
      .then(val => {
        if (val) val.push(score)
        set(dbKey, val || [score]).catch(error => {
          throw error
        })
      })
      .catch(error => {
        throw error
      })
  }

  render() {
    const { text } = this.props
    const restartGame = () => events.pub(restartNamespace, true)

    return <button onClick={restartGame}>{text}</button>
  }
}

const EndGameMsg = ({ time, turns, player }) => {
  const score = { time, turns, player }
  const { victory, challenge, restart } = messages
  return (
    <div>
      <p>{victory(time, turns)}</p>
      {challenge} <RestartButton text={restart} score={score} />
    </div>
  )
}

const GetMessages = props => {
  const { turns, gameStart, gameEnd } = props
  const { title } = messages
  const { round1, round2 } = dynamicMessages

  if (!gameStart) return title
  if (gameEnd) return EndGameMsg(props)
  if (turns % 2 === 0) return round1(props)
  return round2(props)
}

export default GetMessages
