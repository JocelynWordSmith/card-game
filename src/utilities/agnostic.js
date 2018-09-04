import { keygen } from './keygen'
import events from './events'

// This file should only contain vanilla methods without 3rd party dependencies
// avoid importing unless this file gets larger and needs to be split up

// assign unique id to array elements
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
// not as fast as possible due to cloning the array
// but seems like a better idea
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
