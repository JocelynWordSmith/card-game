import { keygen } from './keygen'
import events from './events'

// assign unique id to array elements
// its a convenience method, but not very performant when used on larger data
// but i only have small data
const mapIdToArr = arr =>
  arr.map(item => ({
    val: item,
    id: keygen(),
  }))

// shared counter for game turns
function counter(nameSpace, turns = 0) {
  return function add(sign, match) {
    if (sign || sign === null) {
      turns += 1
      const next = { turns, sign, match }
      events.pub(nameSpace, next)
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
