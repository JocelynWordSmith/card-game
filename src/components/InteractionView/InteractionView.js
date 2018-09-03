import React from 'react'

import GameBoard from '../GameBoard/GameBoard'
import Menu from '../Menu/Menu'
import LeaderBoard from '../LeaderBoard/LeaderBoard'
import { events, gameSetting } from '../../utilities/utilities'
import { difficultySetting, startGameNamespace } from '../../utilities/copyConfig'

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
    return (
      <div>
        <Menu difficulty={difficulty} />
        <LeaderBoard />
      </div>
    )
  }
}

export default InteractionView
