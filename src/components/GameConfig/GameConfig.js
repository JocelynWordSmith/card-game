import Async from 'react-promise'
import React from 'react'

import getPayload from '../../utilities/services'
import { GameOptionDropDown, DisabledDropdown } from '../GameOptionDropDown/GameOptionDropDown'

// CONFIG ITEMS
// move these somewhere else
// state/props/util or something
const payloadId = 'GAME_DATA'
const payloadTarget = 'levels'

function afterResponse(difficulty) {
  return function resolvedDropdown(response) {
    return <GameOptionDropDown optionData={response[payloadTarget]} difficulty={difficulty} />
  }
}

const GameConfig = ({ difficulty }) => {
  const resolvedComponent = afterResponse(difficulty)

  return (
    <form className="GameConfig">
      <Async
        promise={getPayload(payloadId, true)}
        then={resolvedComponent}
        pending={<DisabledDropdown />}
      />
    </form>
  )
}

export default GameConfig
