import React from 'react'
import PropTypes from 'prop-types'

import styles from './Card.scss'
import { hiddenTextSign } from '../../assets/content/config'

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
  <div className={`${styles.scene} ${disabled ? styles.isFlipped : ''}`}>
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
