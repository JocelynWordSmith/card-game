import React from 'react'

import Timer from '../Timer/Timer'
import GameBoard from '../GameBoard/GameBoard'
import Menu from '../Menu/Menu'
import Messenger from '../Messenger/Messenger'

// import styles from './Game.scss'

const Game = () => (
  <div>
    <h2>Game</h2>
    Messenger: <Messenger />
    Menu: <Menu />
    Timer: <Timer />
    GameBoard: <GameBoard />
  </div>
)

export default Game
