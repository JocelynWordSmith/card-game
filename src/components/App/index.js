import React from 'react'

import Messenger from '../Messenger/Messenger'
import InteractionView from '../InteractionView/InteractionView'
import { keygen, events } from '../../utilities/utilities'
import styles from './App.scss'

const restartNamespace = 'newGame'
const keyPrefix = 'gamecount-'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      key: `${keyPrefix}${keygen()}`,
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
    const { key } = this.state
    return (
      <div key={key} className={styles.App}>
        <Messenger />
        <InteractionView />
      </div>
    )
  }
}

export default App
