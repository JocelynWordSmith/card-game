import { keygen } from './keygen'
import events from './events'
import { endGameSuffix } from '../assets/content/config'

// assign unique id to array elements
// its a convenience method, but not very performant when used on larger data
// but i only have small data
const mapIdToArr = arr =>
  arr.map(item => ({
    val: item,
    id: keygen(),
  }))

// shared counter for game turns
// using the namespace/sufix/prefix pattern seems game agnostic
// TODO change match and pair nomenclature to 'score' and 'point'
function counter(nameSpace, maxPairs) {
  let [turns, matches] = [0, 0]
  // think about moving game start logic here instead of pub/sub
  // events.pub(`${nameSpace}${startGameSuffix}`)
  return function add(sign, match) {
    if (sign || sign === null) {
      turns += 1
      if (match) matches += 1

      events.pub(nameSpace, { turns, sign, match, matches })
      if (matches >= maxPairs)
        events.pub(`${nameSpace}${endGameSuffix}`, { turns, sign, match, matches })
    }
    return turns
  }
}

// shared tracker for game difficulty
function gameSetting() {
  let setting = null
  return function set(newSetting) {
    if (newSetting) {
      setting = newSetting
    }
    return setting
  }
}

// Durstenfeld shuffle, adapted from one online
// not as fast as possible due to shallow cloning the array
// but seems like a better idea than mutating
function shuffleArray(array) {
  const shuff = array.slice()
  for (let i = shuff.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuff[i], shuff[j]] = [shuff[j], shuff[i]]
  }
  return shuff
}

// checks if number isn't zero and is even
// i use it to check if it is the first or second round of a turn
const byTwo = num => !!num && !(num % 2)

export { counter, gameSetting, mapIdToArr, byTwo, shuffleArray }
