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
} from '../../utilities/copyConfig'

class GameConfig extends React.Component {
  constructor(props) {
    super(props)
    this.difficulty = props.difficulty
    this.setDifficulty = this.setDifficulty.bind(this)
    this.captureInput = this.captureInput.bind(this)
    this.state = {}
    this.getOptions()
  }

  getOptions() {
    getPayload(payloadId, true).then(response => {
      const options = mapIdToArr(response[payloadTarget])
      this.setState({ options })
      const chosenDifficulty = options[0].val[optionTextTarget]
      this.difficulty(chosenDifficulty)
    })
  }

  setDifficulty(event) {
    this.difficulty(event.target.value)
  }

  captureInput(event) {
    this.setState({ name: event.target.value })
  }

  render() {
    const { options } = this.state
    const { setDifficulty, captureInput } = this
    const disabled = !options
    const clickCallback = () => events.pub(startGameNamespace, this.state.name)

    return (
      <form className={styles.GameConfig}>
        <PlayerName captureInput={captureInput} disabled={disabled} />
        <GameDifficulty setDifficulty={setDifficulty} options={options} disabled={disabled} />
        <GameOptionSubmit disabled={disabled} clickCallback={clickCallback} />
      </form>
    )
  }

  componentDidMount() {}
}

GameConfig.propTypes = {
  difficulty: PropTypes.func,
}

export default GameConfig
