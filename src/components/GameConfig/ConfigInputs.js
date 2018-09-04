import React from 'react'

import {
  inputId,
  inputLabel,
  gameSubmitText,
  dropdownId,
  dropdownLabel,
  optionTextTarget,
} from '../../utilities/copyConfig'
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

const PlayerName = ({ captureInput, disabled }) => (
  <div className={styles.PlayerName}>
    <label htmlFor={inputId}>{inputLabel}</label>
    <input id={inputId} type="text" onInput={captureInput} disabled={disabled} />
  </div>
)

const GameDifficulty = ({ setDifficulty, options, disabled }) => (
  <div className={styles.GameDifficulty}>
    <label htmlFor={dropdownId}>{dropdownLabel}</label>
    <select id={dropdownId} onChange={setDifficulty} disabled={disabled}>
      {!disabled && <OptionCollection options={options} />}
    </select>
  </div>
)

export { GameDifficulty, PlayerName, GameOptionSubmit }
