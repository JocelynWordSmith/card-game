import React from 'react'
import PropTypes from 'prop-types'

import Card from '../Card/Card'
import { getPayload, shuffleArray, events, mapIdToArr, counter } from '../../utilities/utilities'
import {
  payloadId,
  payloadTarget,
  optionTextTarget,
  cardSignKey,
  turnCountNameSpace,
  endGameNamespace,
} from '../../utilities/copyConfig'
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
    this.gameCounter = counter(turnCountNameSpace)
    this.listenForCardMatch = this.listenForCardMatch.bind(this)
    this.getPayloadCallback = this.getPayloadCallback.bind(this)
  }

  componentDidMount() {
    this.turnCountUnsub = events.sub(turnCountNameSpace, this.listenForCardMatch)
  }
  componentWillUnmount() {
    this.turnCountUnsub()
  }

  gameOver(matches) {
    return matches >= this.state.cardData.length / 2
  }

  listenForCardMatch(turnData) {
    const matches = this.state.matches + turnData.match
    this.setState({ matches })

    if (this.gameOver(matches)) events.pub(endGameNamespace, true)
  }

  getPayloadCallback(response) {
    const { difficulty } = this.props
    const payload = response[payloadTarget]
    const difficultyLevels = payload.filter(level => level[optionTextTarget] === difficulty)
    const shuffleCards = shuffleArray(difficultyLevels[0][cardSignKey])
    const cardData = mapIdToArr(shuffleCards)

    this.setState({ cardData })
  }

  setupCardData() {
    getPayload(payloadId).then(this.getPayloadCallback.bind(this))
  }

  render() {
    const { gameCounter } = this
    const { cardData } = this.state

    return <CardCollection gameCounter={gameCounter} cardData={cardData} />
  }
}

Cards.propTypes = {
  difficulty: PropTypes.string,
}

export default Cards
