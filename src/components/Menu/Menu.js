import React from 'react'
import PropTypes from 'prop-types'

import GameConfig from '../GameConfig/GameConfig'
import styles from './Menu.scss'
import instructionData from '../../assets/content/instructionCopy'

const InstructionsList = props => (
  <ol className={styles.Instructions}>
    {props.list.map(item => <li key={item.id}>{item.val}</li>)}
  </ol>
)

// passing array to render, does not mutate
InstructionsList.propTypes = {
  list: PropTypes.array,
}

const Instructions = () => {
  const { header, steps } = instructionData
  return (
    <div>
      <h2 className={styles.InstructionHeader}>{header}</h2>
      {steps.map(item => (
        <div key={item.id}>
          <h3 className={styles.InstructionListHeader}>{item.val.head}</h3>
          <InstructionsList list={item.val.body} />
        </div>
      ))}
    </div>
  )
}

const Menu = ({ difficulty }) => (
  <div className={styles.Menu}>
    <Instructions />
    <GameConfig difficulty={difficulty} />
  </div>
)

Menu.propTypes = {
  difficulty: PropTypes.func,
}

export default Menu
