import React from 'react'

import GameConfig from '../GameConfig/GameConfig'
import styles from './Menu.scss'
import { mapIdToArr } from '../../utilities/utilities'

const getInstructionData = () => {
  const header = 'Memory Game Instructions'
  const steps = [
    {
      head: 'To start the game:',
      body: ['Enter your name', 'Select a difficulty from the dropdown', 'Then press submit'],
    },
    {
      head: 'Once you have started the game:',
      body: [
        'Select a card, the face will appear',
        'Select a second card, the face will appear',
        'If they match, they stay face up',
        "If they don't match, they flip back over",
        'Match all the cards and you win the game!',
        'Try to finish as fast as you can with as few turns as possible',
      ],
    },
  ]

  steps.forEach(item => {
    item.body = mapIdToArr(item.body)
  })

  const stepsWithIds = mapIdToArr(steps)
  return {
    header,
    steps: stepsWithIds,
  }
}

const InstructionsList = props => (
  <ol className={styles.Instructions}>
    {props.list.map(item => <li key={item.id}>{item.val}</li>)}
  </ol>
)

const Instructions = () => {
  const { header, steps } = getInstructionData()
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

export default Menu
