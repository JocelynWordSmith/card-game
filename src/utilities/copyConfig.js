// i prefer to keep shared strings in a single place
// I do the same with any widely shared variables if possible
//  I also like to do this with copy, but there wasnt very much copy to consolo

const dbKey = 'highScores2'
const restartNamespace = 'newGame'
const turnCountNameSpace = 'cardClicked'
const startGameNamespace = 'gameStart'
const endGameNamespace = 'gameEnd'
const keyPrefix = 'gamecount-'
const payloadId = 'GAME_DATA'
const revertDelay = 600
const payloadTarget = 'levels'
const optionTextTarget = 'difficulty'
const cardSignKey = 'cards'
const inputId = 'playerName'
const inputLabel = 'Player Name'
const gameSubmitText = 'Start Game'
const dropdownId = 'difficultySelect'
const dropdownLabel = 'Game difficulty'

export {
  dbKey,
  restartNamespace,
  turnCountNameSpace,
  startGameNamespace,
  endGameNamespace,
  keyPrefix,
  revertDelay,
  payloadId,
  payloadTarget,
  optionTextTarget,
  cardSignKey,
  inputId,
  inputLabel,
  gameSubmitText,
  dropdownId,
  dropdownLabel,
}

export default {
  dbKey,
  restartNamespace,
  turnCountNameSpace,
  startGameNamespace,
  endGameNamespace,
  keyPrefix,
  revertDelay,
  payloadId,
  payloadTarget,
  optionTextTarget,
  cardSignKey,
  inputId,
  inputLabel,
  gameSubmitText,
  dropdownId,
  dropdownLabel,
}
