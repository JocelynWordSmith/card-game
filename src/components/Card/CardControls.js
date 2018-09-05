import React from 'react'
import PropTypes from 'prop-types'

import styles from './Card.scss'

const hiddenTextSign = 'x'

const CardButton = ({ handleClick, disabled, label }) => (
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

const CardFaces = ({ disabled, classname, sign }) => (
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

export default { CardButton, CardFaces }
