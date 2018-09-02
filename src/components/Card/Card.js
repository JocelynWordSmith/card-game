import React from 'react'
import { events, byTwo } from '../../utilities/agnostic'

const turnCountNameSpace = 'cardClicked'

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
    this.count = 0
  }
  handleCountIncrease(lastClick) {
    const { disabled } = this.state
    const { turns } = lastClick
    const isRoundTwo = byTwo(turns)
    const { sign } = this.props
    const matched = lastClick.sign === sign
    if (this.state.matched || !disabled || !isRoundTwo) {
      this.setState({ lastClick, turns })
      return lastClick
    }
    this.setState({ lastClick, turns, disabled: matched, matched })
    return lastClick
  }

  componentDidMount() {
    this.countSub = events.sub(turnCountNameSpace, this.handleCountIncrease.bind(this))
  }
  handleClick() {
    if (this.state.matched || this.state.disabled) return false
    // since state isnt updated till the end of this function
    // we add 1 to turns inside this function
    if (!byTwo(this.state.turns + 1)) {
      this.setState({ disabled: true }, () => {
        this.props.gameCounter(this.props.sign, false)
      })
      return false
    }
    return this.matchCheck()
  }
  matchCheck() {
    const { lastClick } = this.state
    const { sign } = lastClick

    const matched = sign === this.props.sign
    const disabled = matched

    this.setState({ disabled: true }, () => {
      setTimeout(() => {
        this.setState({ disabled }, () => {
          this.props.gameCounter(this.props.sign, matched)
        })
      }, 400)
    })
    return matched
  }
  render() {
    const { disabled, matched } = this.state
    const { sign } = this.props
    let classname = 'active'
    disabled && (classname = 'disabled')
    matched && (classname = 'matched')
    return (
      <div>
        <button className={classname} value={sign} onClick={this.handleClick}>
          {disabled ? sign : 'x'}
        </button>
      </div>
    )
  }
}

export default Card
