import React from 'react'

import GameConfig from '../GameConfig/GameConfig'
import styles from './Menu.scss'

const Menu = ({ difficulty }) => (
  <div className={styles.Menu}>
    <h2>Menu</h2>
    <p>Instructions</p>
    <GameConfig difficulty={difficulty} />
  </div>
)

export default Menu
