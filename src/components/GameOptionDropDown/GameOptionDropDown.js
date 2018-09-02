import React from 'react'

import { mapIdToArr, events } from '../../utilities/agnostic'

const startGameNamespace = 'gameStart'
const optionTextTarget = 'difficulty'
const gameSubmitText = 'Start Game'
const dropdownId = 'difficulty-select'
const dropdownLabel = 'Game difficulty'
const pendingMsg = '--Loading--'

const DisabledDropdown = () => (
  <div>
    <label htmlFor={dropdownId}>{dropdownLabel}</label>
    <select id={dropdownId} disabled="true">
      <option value="">{pendingMsg}</option>
    </select>
    <GameOptionSubmit disabled />
  </div>
)

const GameOptionSubmit = ({ disabled }) => {
  const type = 'button'
  const className = 'GameOptionSubmit'
  const clickCallback = () => events.pub(startGameNamespace, true)

  return (
    <button type={type} className={className} disabled={disabled} onClick={clickCallback}>
      {gameSubmitText}
    </button>
  )
}

const OptionCollection = ({ optionData }) =>
  optionData.map(item => {
    const value = item.val[optionTextTarget]
    const { id } = item

    return (
      <option key={id} value={value}>
        {value}
      </option>
    )
  })

class GameOptionDropDown extends React.Component {
  constructor(props) {
    super(props)
    this.difficulty = props.difficulty
    this.setDifficulty = this.setDifficulty.bind(this)
    this.optionData = mapIdToArr(props.optionData)
  }

  setDifficulty(event) {
    this.difficulty(event.target.value)
  }

  render() {
    const { optionData } = this
    const onChange = this.setDifficulty

    return (
      <div>
        <label htmlFor={dropdownId}>{dropdownLabel}</label>
        <select id={dropdownId} onChange={onChange}>
          <OptionCollection optionData={optionData} />
        </select>
        <GameOptionSubmit />
      </div>
    )
  }

  componentDidMount() {
    const chosenDifficulty = this.optionData[0].val[optionTextTarget]
    this.difficulty(chosenDifficulty)
  }
}

export { DisabledDropdown, GameOptionDropDown }
