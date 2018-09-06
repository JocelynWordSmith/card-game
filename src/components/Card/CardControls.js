import React from 'react'
import PropTypes from 'prop-types'

import styles from './Card.scss'
import { hiddenTextSign } from '../../assets/content/config'

// using buttons ensures proper keyboard, screen reader,
// mobile devices, and non standard interfaces can use it

// adding extra keyboard controls (up/down/left/right)
// limits the number of devices that can access the game,
// and if initially implimented would increase the chances that
// the state/rules/business logic would be dependent on those controls

// sorry i just have strong feelings about native html controls and semantics
export const CardButton = ({ handleClick, disabled, label }) => (
  <button
    type="button"
    className={`${styles.Card}`}
    onClick={handleClick}
    aria-pressed={disabled}
    aria-label={label}
  >
    {label}
  </button>
)

CardButton.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
}

export const CardFaces = ({ disabled, classname, sign }) => (
  // aria hidden bc info is all contained in button
  <div className={`${styles.scene} ${disabled ? styles.isFlipped : ''}`} aria-hidden="true">
    <div className={`${styles.flipItem} ${classname}`}>
      <span>{hiddenTextSign}</span>
    </div>
    <div className={`${styles.flipItem} ${styles.backFace} ${classname}`}>
      <span>{sign}</span>
    </div>
  </div>
)

CardFaces.propTypes = {
  classname: PropTypes.string,
  sign: PropTypes.string,
  disabled: PropTypes.bool,
}
