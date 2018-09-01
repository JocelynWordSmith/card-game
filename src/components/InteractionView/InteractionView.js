import React from 'react'

import GameBoard from '../GameBoard/GameBoard'
import Menu from '../Menu/Menu'
import { events, gameSetting } from '../../utilities/agnostic'

const difficultySetting = 'difficulty'
const startGameNamespace = 'gameStart'

class InteractionView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      turn: this.props.gameCounter(),
      gameCounter: this.props.gameCounter,
      difficulty: gameSetting(difficultySetting),
    }
  }

  gameStartCallback({ started }) {
    if (started) {
      this.setState({
        started,
      })
      this.gameStartUnsub()
    }
  }
  listenForFirstTurn() {
    return events.sub(startGameNamespace, this.gameStartCallback.bind(this))
  }

  componentDidMount() {
    this.gameStartUnsub = this.listenForFirstTurn()
  }

  render() {
    const { gameCounter, difficulty } = this.state
    if (this.state.started) {
      return <GameBoard gameCounter={gameCounter} difficulty={difficulty()} />
    }
    return <Menu difficulty={difficulty} />
  }
}

export default InteractionView
