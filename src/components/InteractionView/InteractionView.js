import React from 'react'

import GameBoard from '../GameBoard/GameBoard'
import Menu from '../Menu/Menu'
import LeaderBoard from '../LeaderBoard/LeaderBoard'
import { startGameNamespace } from '../../utilities/copyConfig'
import { events } from '../../utilities/utilities'
import styles from './InteractionView.scss'

class InteractionView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
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
    const { difficulty } = this.props
    const hasStarted = this.state && this.state.started

    if (hasStarted) return <GameBoard difficulty={difficulty()} />
    return (
      <div className={styles.InteractionView}>
        <Menu difficulty={difficulty} />
        <LeaderBoard />
      </div>
    )
  }
}

export default InteractionView
