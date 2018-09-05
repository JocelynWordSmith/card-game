import React from 'react'

import { get, set } from 'idb-keyval'
import { events } from '../../utilities/utilities'
import { dbKey, restartNamespace } from '../../utilities/copyConfig'

const victory = (time, turns, player) =>
  `Congratulations ${player}! You have beaten the game in ${time} with just ${turns} turns!`

class RestartButton extends React.Component {
  constructor(props) {
    super(props)
    this.saveScore()
  }

  saveScore() {
    const { time, turns, player, difficulty } = this.props
    const setting = difficulty()
    const score = { time, turns, player }
    get(dbKey)
      .then(val => {
        const toSave = val || {}
        const diffArr = toSave[setting]
        if (diffArr) {
          diffArr.push(score)
          toSave[setting] = diffArr.sort((a, b) => a.turns - b.turns).slice(0, 3)
        } else {
          toSave[setting] = [score]
        }
        set(dbKey, toSave).catch(error => {
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

const EndGameMsg = props => {
  const { time, turns, messages } = props
  const { challenge, restart } = messages
  return (
    <div>
      <p>{victory(time, turns)}</p>
      {challenge} <RestartButton text={restart} {...props} />
    </div>
  )
}

export default EndGameMsg
