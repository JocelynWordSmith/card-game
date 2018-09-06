// i prefer to keep shared strings and variables consolodated
// makes changes/translations/fixes easier
// split the file out if it gets over 100 lines

// Where player scores are saved
export const dbKey = 'highScores'
// pub/sub event namespaces
export const restartNamespace = 'newGame'
export const turnCountNameSpace = 'memoryCardTurn'
// pattern to follow when multiple game types are added
export const startGameSuffix = `-gameStart`
export const endGameSuffix = `-gameEnd`
export const startGameNamespace = `${turnCountNameSpace}${startGameSuffix}`
export const endGameNamespace = `${turnCountNameSpace}${endGameSuffix}`
// key attached to the page <main> element containing the game
export const keyPrefix = 'gamecount-'
// key to reference the url and data of the NYT game data
export const payloadId = 'GAME_DATA'
// entry key into NYT game data
export const payloadTarget = 'levels'
// the key inside each levels object identifying the difficulty
export const optionTextTarget = 'difficulty'

// GameBoard.js
export const cardSignKey = 'cards'

// Card.js
// setTimeout delay on cards flipping back over
export const revertDelay = 600
// what screen reader announces as the card sign when card face down
export const hiddenSrSign = 'hidden'
// makes the screen reader specific text
export const getLabel = (idx, sign, matched) =>
  `card number ${idx + 1}'s card face is ${sign}. ${matched ? 'this card has been matched' : ''}`

// CardControls.js
// displays on the back face of a card
export const hiddenTextSign = 'x'

// ConfigInputs.js
export const inputId = 'playerName'
export const inputLabel = 'Player Name'
export const gameSubmitText = 'Start Game'
export const dropdownId = 'difficultySelect'
export const dropdownLabel = 'Game difficulty'

// LeaderBoard.js
// header of the leaderboards
export const lbSectionHeader = 'Leaderboards:'
// button test to clear current scores
export const lbClearText = 'Clear Leaderboard'
// column headers of a leaderboard
export const lbText = { c1: 'Rank', c2: 'Name', c3: 'Time', c4: 'Turns' }

// EngGameMsg.js
export const victory = (time, turns, player) =>
  `Congratulations ${player}! You have beaten the game in ${time} with just ${turns} turns!`

// GetMessages.js
export const messages = {
  title: 'Memory Card Game',
  challenge: 'Think you can do better?',
  restart: 'Click here to restart the game',
}

export const dynamicMessages = {
  round1: ({ sign, match }) => {
    const isMatch = `It was ${match ? '' : 'not'} a match`
    const isSign = sign ? `You selected a ${sign}. ${isMatch}. ` : ''
    return `${isSign}Select a card`
  },
  round2: ({ sign }) => `You selected a ${sign}. Select your second card`,
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
