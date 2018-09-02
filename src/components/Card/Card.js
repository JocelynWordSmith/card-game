import React from 'react'
import { events, byTwo } from '../../utilities/agnostic'

// non props shared config
// putting at top for easier changes
const turnCountNameSpace = 'cardClicked'
const revertDelay = 400

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

  updateCounter(disabled, matched) {
    const { sign, gameCounter } = this.props
    this.setState({ disabled }, () => {
      gameCounter(sign, matched)
    })
    return matched
  }

  delayedCount(disabled, matched) {
    setTimeout(() => {
      this.updateCounter(disabled, matched)
    }, revertDelay)
  }

  handleClick() {
    const { matched, disabled, turns } = this.state
    // if it should be disabled leave it alone
    if (matched || disabled) return false
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
    if (matched) return 'matched'
    if (disabled) return 'disabled'
    return 'active'
  }

  render() {
    const { disabled, matched } = this.state
    const { sign } = this.props
    const { getClassname } = this.constructor
    const classname = getClassname(disabled, matched)

    return (
      <div>
        <button className={classname} onClick={this.handleClick}>
          {disabled ? sign : 'x'}
        </button>
      </div>
    )
  }
}

export default Card
