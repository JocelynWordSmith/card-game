import Async from 'react-promise'
import React from 'react'

import getPayload from '../../utilities/services'
import { keygen, events } from '../../utilities/agnostic'

// CONFIG ITEMS
// move these somewhere else
// state/props/util or something
const payloadId = 'GAME_DATA'
const startGameNamespace = 'gameStart'
const dropdownId = 'difficulty-select'
const dropdownLabel = 'Game difficulty'
const pendingMsg = '--Loading--'
const payloadTarget = 'levels'
const optionTextTarget = 'difficulty'
const gameSubmitText = 'Start Game'

const GameOptionSubmit = ({ disabled }) => (
  <button
    type="button"
    className="GameOptionSubmit"
    disabled={disabled}
    onClick={() => events.pub(startGameNamespace, true)}
  >
    {gameSubmitText}
  </button>
)

const OptionCollection = ({ optionData }) =>
  optionData.map(item => {
    const value = item[optionTextTarget]
    return (
      <option key={keygen()} value={value}>
        {value}
      </option>
    )
  })

class GameOptionDropDown extends React.Component {
  constructor(props) {
    super(props)
    this.difficulty = props.difficulty
    this.setDifficulty = this.setDifficulty.bind(this)
  }
  setDifficulty(event) {
    this.difficulty(event.target.value)
  }
  render() {
    const { optionData } = this.props
    return (
      <div>
        <label htmlFor={dropdownId}>{dropdownLabel}</label>
        <select id={dropdownId} onChange={this.setDifficulty}>
          <OptionCollection optionData={optionData} />
        </select>
        <GameOptionSubmit />
      </div>
    )
  }
  componentDidMount() {
    this.difficulty(this.props.optionData[0][optionTextTarget])
    // TODO temporary to get to game page faster
    events.pub(startGameNamespace, true)
  }
}

const DisabledDropdown = () => (
  <div>
    <label htmlFor={dropdownId}>{dropdownLabel}</label>
    <select id={dropdownId} disabled="true">
      <option value="">{pendingMsg}</option>
    </select>
    <GameOptionSubmit disabled />
  </div>
)

const GameConfig = ({ difficulty }) => (
  <form className="GameConfig">
    <Async
      promise={getPayload(payloadId, true)}
      then={response => (
        <GameOptionDropDown optionData={response[payloadTarget]} difficulty={difficulty} />
      )}
      pending={<DisabledDropdown />}
    />
  </form>
)

export default GameConfig
