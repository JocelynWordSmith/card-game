import React from 'react'

import Card from '../Card/Card'
import getPayload from '../../utilities/services'
import { events, mapIdToArr, counter } from '../../utilities/agnostic'
import styles from './GameBoard.scss'

const payloadId = 'GAME_DATA'
const payloadTarget = 'levels'
const optionTextTarget = 'difficulty'
const cardSignKey = 'cards'
const turnCountNameSpace = 'cardClicked'
const endGameNamespace = 'gameEnd'

const CardCollection = ({ gameCounter, cardData = [] }) => (
  <div className={styles.GameBoard}>
    {cardData.map(item => <Card gameCounter={gameCounter} key={item.id} sign={item.val} />)}
  </div>
)

class Cards extends React.Component {
  constructor(props) {
    super(props)
    this.state = { matches: 0 }
    this.setupCardData()
    this.gameCounter = counter(turnCountNameSpace)
  }
  componentDidMount() {
    this.listenForCardMatch()
  }
  listenForCardMatch() {
    events.sub(turnCountNameSpace, turnData => {
      const matches = this.state.matches + turnData.match
      this.setState({ matches })
      if (matches >= this.state.cardData.length / 2) {
        events.pub(endGameNamespace, true)
      }
    })
  }
  setupCardData() {
    const { difficulty } = this.props
    getPayload(payloadId).then(response => {
      const payload = response[payloadTarget]
      const difficultyLevels = payload.filter(level => level[optionTextTarget] === difficulty)
      const cardData = mapIdToArr(difficultyLevels[0][cardSignKey])

      this.setState({ cardData })
    })
  }
  render() {
    const { gameCounter } = this
    const { cardData } = this.state
    return <CardCollection gameCounter={gameCounter} cardData={cardData} />
  }
}

export default Cards
