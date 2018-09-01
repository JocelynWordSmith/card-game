import React from 'react'

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = { disabled: false }
    this.handleClick = this.handleClick.bind(this)
    this.sign = this.props.sign
  }
  handleClick(event) {
    // add pairing logic
    this.setState({ disabled: true })
    this.gameCounter(this.sign)
  }
  render() {
    const { sign } = this
    return (
      <button
        className="Card"
        value={sign}
        onClick={this.handleClick}
        disabled={this.state.disabled}
      >
        {sign} {this.props.gameCounter()}
      </button>
    )
  }
}

export default Card
