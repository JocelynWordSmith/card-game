import React from 'react'

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

export default { CardButton, CardFaces }
