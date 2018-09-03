import React from 'react'

import GameBoard from '../GameBoard/GameBoard'
import Menu from '../Menu/Menu'
import { events, gameSetting } from '../../utilities/utilities'

const difficultySetting = 'difficulty'
const startGameNamespace = 'gameStart'

class InteractionView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      difficulty: gameSetting(difficultySetting),
    }
  }

  gameStartCallback(started) {
    if (started) {
      this.setState({ started })
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
    const { difficulty } = this.state

    if (this.state.started) {
      return <GameBoard difficulty={difficulty()} />
    }
    return <Menu difficulty={difficulty} />
  }
}

export default InteractionView
