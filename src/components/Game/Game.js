import React from 'react'

import GameBoard from '../GameBoard/GameBoard'

import styles from './Game.scss'

const Game = () => (
  <div className={styles.Game}>
    <h2>Game</h2>
    <div className={styles.GameContainer}>
      <GameBoard />
    </div>
  </div>
)

export default Game
