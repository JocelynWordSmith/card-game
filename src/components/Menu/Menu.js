import React from 'react'

import GameConfig from '../GameConfig/GameConfig'
import styles from './Menu.scss'
import { mapIdToArr } from '../../utilities/utilities'

const getInstructionData = () => {
  const header = 'Memory Game Instructions'
  const steps = [
    'To start the game:',
    'Select a difficulty from the dropdown',
    'Then press submit',
    'Once you have started the game:',
    'The card faces will be shown to you, and then flipped over',
    'You will select a card, and it will be shown to you',
    'You will select a second card, and it will be shown to you',
    'If both of the cards match, they stay face up',
    "If they don't match, they flip back down.",
    'Once you have matched all the cards, you win the game!',
    'Try to finish as fast as you can with as few turns as possible',
  ]
  const stepsWithIds = mapIdToArr(steps)
  return {
    header,
    steps: stepsWithIds,
  }
}

const Instructions = () => {
  const { header, steps } = getInstructionData()
  return (
    <div>
      <h2>{header}</h2>
      <ol>{steps.map(item => <li key={item.id}>{item.val}</li>)}</ol>
    </div>
  )
}

const Menu = ({ difficulty }) => (
  <div className={styles.Menu}>
    <Instructions />
    <GameConfig difficulty={difficulty} />
  </div>
)

export default Menu
