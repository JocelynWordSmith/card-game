import React from 'react'

import Messenger from '../Messenger/Messenger'
import InteractionView from '../InteractionView/InteractionView'
import { keygen, events, gameSetting } from '../../utilities/utilities'
import { keyPrefix, restartNamespace } from '../../assets/content/config'
import styles from './App.scss'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      key: `${keyPrefix}${keygen()}`,
      difficulty: gameSetting(),
      // easiest way to prevent FOUC
      // is reverted when styles load in
      // not a production solution
      display: { display: 'none' },
    }
    this.restartGame = this.restartGame.bind(this)
  }

  restartGame() {
    this.setState({ key: `${keyPrefix}${keygen()}` })
  }

  componentDidMount() {
    events.sub(restartNamespace, this.restartGame)
  }

  render() {
    const { key, difficulty, display } = this.state
    return (
      <main key={key} className={styles.App} style={display}>
        <Messenger difficulty={difficulty} />
        <InteractionView difficulty={difficulty} />
      </main>
    )
  }
}

export default App
