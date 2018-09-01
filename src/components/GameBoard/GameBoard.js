import React from 'react'

import Card from '../Card/Card'
import getPayload from '../../utilities/services'
import { keygen } from '../../utilities/agnostic'
import styles from './GameBoard.scss'

const payloadId = 'GAME_DATA'
const payloadTarget = 'levels'
const optionTextTarget = 'difficulty'
const cardSignKey = 'cards'

const CardCollection = ({ cardData = [], gameCounter }) => (
  <div className={styles.GameBoard}>
    {cardData.map(item => <Card gameCounter={gameCounter} key={keygen()} sign={item} />)}
  </div>
)

class Cards extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.setupCardData()
  }
  setupCardData() {
    const { difficulty } = this.props
    getPayload(payloadId).then(response => {
      const payload = response[payloadTarget]
      const difficultyLevels = payload.filter(level => level[optionTextTarget] === difficulty)
      this.setState({ cardData: difficultyLevels[0][cardSignKey] })
    })
  }
  render() {
    const { gameCounter } = this.props
    const { cardData } = this.state
    return <CardCollection gameCounter={gameCounter} cardData={cardData} />
  }
}

export default Cards
