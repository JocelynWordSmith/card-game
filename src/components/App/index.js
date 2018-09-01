import React from 'react'

import Messenger from '../Messenger/Messenger'
import InteractionView from '../InteractionView/InteractionView'
import { counter } from '../../utilities/agnostic'
import styles from './App.scss'

const startGameNamespace = 'gameStart'

const App = () => {
  const gameCounter = counter(startGameNamespace)
  return (
    <div className={styles.App}>
      <Messenger gameCounter={gameCounter} />
      <InteractionView gameCounter={gameCounter} />
    </div>
  )
}

export default App
