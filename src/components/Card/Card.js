import React from 'react'
import { events, byTwo } from '../../utilities/utilities'

import styles from './Card.scss'
import { turnCountNameSpace, revertDelay } from '../../utilities/copyConfig'

// putting at top for easier changes
const hiddenTextSign = 'x'
const hiddenSrSign = 'hidden'
const getLabel = (idx, sign, matched) =>
  `card number ${idx + 1}'s card face is ${sign}. ${matched ? 'this card has been matched' : ''}`

// bugfix to keep cards from being selected while the unmatched cards are visible
// (i.e. when the second card is clicked but the revert delay hasn't finished)
// this fixes the issue without adding complexity to the program,
let delayActive = false

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
      turns: 0,
      matched: false,
      lastClick: {},
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleCountIncrease = this.handleCountIncrease.bind(this)
  }

  signMatch(sign) {
    return this.props.sign === sign
  }

  handleCountIncrease(lastClick) {
    const { disabled } = this.state
    const { turns, sign } = lastClick
    const isRoundTwo = byTwo(turns)
    const matched = this.signMatch(sign)
    const noUIChange = this.state.matched || !disabled || !isRoundTwo
    if (noUIChange) return this.setState({ lastClick, turns })
    return this.setState({ lastClick, turns, disabled: matched, matched })
  }

  componentDidMount() {
    this.countSub = events.sub(turnCountNameSpace, this.handleCountIncrease)
  }

  componentWillUnmount() {
    this.countSub()
  }

  updateCounter(disabled, matched) {
    const { sign, gameCounter } = this.props
    this.setState({ disabled }, () => {
      gameCounter(sign, matched)
    })
    return matched
  }

  delayedCount(disabled, matched) {
    delayActive = true
    setTimeout(() => {
      this.updateCounter(disabled, matched)
      delayActive = false
    }, revertDelay)
  }

  handleClick() {
    const { matched, disabled, turns } = this.state
    // if it should be disabled leave it alone
    if (matched || disabled || delayActive) return false
    // if this is the first click of the turn, disable card
    if (!byTwo(turns + 1)) return this.updateCounter(true, false)
    // otherwise check if it has been matched
    return this.matchCheck()
  }

  matchCheck() {
    const { lastClick: { sign } } = this.state
    const matched = this.signMatch(sign)

    this.setState({ disabled: true }, () => this.delayedCount(matched, matched))
    return matched
  }

  static getClassname(disabled, matched) {
    if (matched) return styles.matched
    if (disabled) return styles.disabled
    return styles.active
  }

  render() {
    const { disabled, matched } = this.state
    const { sign, idx } = this.props
    const { getClassname } = this.constructor
    const classname = getClassname(disabled, matched)
    const text = disabled ? sign : hiddenTextSign
    // sign to be read to screen readers
    const srSign = disabled ? sign : hiddenSrSign
    const label = getLabel(idx, srSign, matched)

    return (
      <button
        type="button"
        className={classname}
        onClick={this.handleClick}
        aria-pressed={disabled}
        aria-label={label}
      >
        {text}
      </button>
    )
  }
}

export default Card
