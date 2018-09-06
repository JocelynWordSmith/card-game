import React from 'react'
import PropTypes from 'prop-types'

import Card from '../Card/Card'
import { getPayload, shuffleArray, mapIdToArr, counter } from '../../utilities/utilities'
import {
  payloadId,
  payloadTarget,
  optionTextTarget,
  cardSignKey,
  turnCountNameSpace,
} from '../../assets/content/config'
import styles from './GameBoard.scss'

const CardCollection = ({ gameCounter, cardData = [] }) => (
  <form className={styles.GameBoard}>
    {cardData.map((item, idx) => (
      <Card gameCounter={gameCounter} key={item.id} sign={item.val} idx={idx} />
    ))}
  </form>
)

// passing an array as a prop specifically to render it
// no mutations occur
CardCollection.propTypes = {
  cardData: PropTypes.array,
  gameCounter: PropTypes.func,
}

class Cards extends React.Component {
  constructor(props) {
    super(props)
    this.state = { matches: 0 }
    this.setupCardData()
  }

  getPayloadCallback(response) {
    const { difficulty } = this.props
    const payload = response[payloadTarget]
    const difficultyLevels = payload.filter(level => level[optionTextTarget] === difficulty)
    const shuffleCards = shuffleArray(difficultyLevels[0][cardSignKey])
    const cardData = mapIdToArr(shuffleCards)
    this.gameCounter = counter(turnCountNameSpace, cardData.length / 2)
    this.setState({ cardData })
  }

  setupCardData() {
    // binding in contructor was causing an issue, will circle back
    getPayload(payloadId).then(this.getPayloadCallback.bind(this))
  }

  render() {
    const { gameCounter } = this
    const { cardData } = this.state
    if (!gameCounter || !cardData) return <span />
    return <CardCollection gameCounter={gameCounter} cardData={cardData} />
  }
}

Cards.propTypes = {
  difficulty: PropTypes.string,
}

export default Cards
