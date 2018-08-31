import React from 'react'

import Game from '../Game/Game'
import Menu from '../Menu/Menu'
import Messenger from '../Messenger/Messenger'

import styles from './App.scss'

function gameStarted() {
  let hasStarted = false
  return function start(willStart) {
    hasStarted = hasStarted || willStart
    return hasStarted
  }
}

function counter() {
  let turns = 0
  return function add(incriment) {
    turns = incriment ? turns + 1 : turns
    return turns
  }
}

const InteractionView = ({ gameStarted, counter }) => {
  if (gameStarted()) {
    return <Game counter={counter} />
  }
  return <Menu gameStarted={gameStarted} />
}

const ContentWindow = ({ counter, gameStarted }) => (
  <div className={styles.App}>
    <h2>App</h2>
    <Messenger counter={counter} />
    <InteractionView gameStarted={gameStarted} counter={counter} />
  </div>
)

const App = () => <ContentWindow gameStarted={gameStarted()} counter={counter()} />

export default App
