import React from 'react'
import PropTypes from 'prop-types'

import { GameDifficulty, PlayerName, GameOptionSubmit } from './ConfigInputs'
import { events, getPayload, mapIdToArr } from '../../utilities/utilities'
import styles from './GameConfig.scss'
import {
  payloadId,
  payloadTarget,
  optionTextTarget,
  startGameNamespace,
} from '../../assets/content/config'

class GameConfig extends React.Component {
  constructor(props) {
    super(props)
    this.getOptions()
    this.state = {}
    this.difficulty = props.difficulty
    this.setDifficulty = this.setDifficulty.bind(this)
    this.captureInput = this.captureInput.bind(this)
    this.submitClickCallback = this.submitClickCallback.bind(this)
  }

  submitDifficulty(options) {
    const chosenDifficulty = options[0].val[optionTextTarget]
    this.difficulty(chosenDifficulty)
  }

  getOptions() {
    getPayload(payloadId, true).then(response => {
      const options = mapIdToArr(response[payloadTarget])
      this.setState({ options })
      this.submitDifficulty(options)
    })
  }

  setDifficulty(event) {
    this.difficulty(event.target.value)
  }

  captureInput(event) {
    this.setState({ name: event.target.value })
  }

  submitClickCallback() {
    events.pub(startGameNamespace, this.state.name)
  }

  render() {
    const { options } = this.state
    const { setDifficulty, captureInput } = this
    const disabled = !options

    return (
      <form className={styles.GameConfig}>
        <PlayerName captureInput={captureInput} disabled={disabled} />
        <GameDifficulty setDifficulty={setDifficulty} options={options} disabled={disabled} />
        <GameOptionSubmit disabled={disabled} clickCallback={this.submitClickCallback} />
      </form>
    )
  }
}

GameConfig.propTypes = {
  difficulty: PropTypes.func,
}

export default GameConfig
