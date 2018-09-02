import React from 'react'

import Messenger from '../Messenger/Messenger'
import InteractionView from '../InteractionView/InteractionView'
import styles from './App.scss'

const App = () => (
  <div className={styles.App}>
    <Messenger />
    <InteractionView />
  </div>
)

export default App
