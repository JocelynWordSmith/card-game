import React from 'react'
import PropTypes from 'prop-types'

import {
  inputId,
  inputLabel,
  gameSubmitText,
  dropdownId,
  dropdownLabel,
  optionTextTarget,
} from '../../assets/content/config'
import styles from './GameConfig.scss'

const GameOptionSubmit = ({ disabled, clickCallback }) => {
  const type = 'button'

  return (
    <button
      type={type}
      className={styles.GameOptionSubmit}
      disabled={disabled}
      onClick={clickCallback}
    >
      {gameSubmitText}
    </button>
  )
}

// not mutating array, just rendering
GameOptionSubmit.propTypes = {
  disabled: PropTypes.bool,
  clickCallback: PropTypes.func,
}

const OptionCollection = ({ options }) =>
  options.map(item => {
    const value = item.val[optionTextTarget]
    const { id } = item
    return (
      <option key={id} value={value}>
        {value}
      </option>
    )
  })

// not mutating array, just rendering
OptionCollection.propTypes = {
  options: PropTypes.array,
}

const PlayerName = ({ captureInput, disabled }) => (
  <div className={styles.PlayerName}>
    <label htmlFor={inputId}>{inputLabel}</label>
    <input id={inputId} type="text" onInput={captureInput} disabled={disabled} />
  </div>
)

PlayerName.propTypes = {
  captureInput: PropTypes.func,
  disabled: PropTypes.bool,
}

const GameDifficulty = ({ setDifficulty, options, disabled }) => (
  <div className={styles.GameDifficulty}>
    <label htmlFor={dropdownId}>{dropdownLabel}</label>
    <select id={dropdownId} onChange={setDifficulty} disabled={disabled}>
      {!disabled && <OptionCollection options={options} />}
    </select>
  </div>
)

// not mutating array, just rendering
GameDifficulty.propTypes = {
  setDifficulty: PropTypes.func,
  options: PropTypes.array,
  disabled: PropTypes.bool,
}

export { GameDifficulty, PlayerName, GameOptionSubmit }
