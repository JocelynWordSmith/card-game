import { keygen } from './keygen'

// This file should only contain vanilla methods without 3rd party dependencies
// avoid importing unless this file gets larger and needs to be split up

const events = {
  events: {},
  pub(eventName, data) {
    this.events[eventName] = this.events[eventName] || { data: null, subs: {} }
    const eventToPub = this.events[eventName]
    const callbacksToRun = eventToPub.subs

    eventToPub.data = data
    Object.keys(callbacksToRun).forEach(key => {
      callbacksToRun[key](data)
    })
    // console.log(`pub-${eventName}: ${JSON.stringify(data)}`)
  },
  sub(eventName, fn, initCall) {
    this.events[eventName] = this.events[eventName] || { data: null, subs: {} }
    const { data } = this.events[eventName]
    const subKey = keygen()
    const unsub = () => delete this.events[eventName].subs[subKey]

    this.events[eventName].subs[subKey] = fn
    if (initCall) fn(data)

    return unsub
    // console.log(`sub-${eventName}: ${JSON.stringify(data)}`)
  },
}

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
function gameSetting(nameSpace) {
  let setting = null
  return function set(newSetting) {
    if (newSetting) {
      setting = newSetting
      events.pub(nameSpace, setting)
    }
    return setting
  }
}

// Durstenfeld shuffle, found online
// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i -= 1) {
//     const j = Math.floor(Math.random() * (i + 1))
//     ;[array[i], array[j]] = [array[j], array[i]]
//   }
// }

const byTwo = num => !!num && !(num % 2)

export { counter, events, gameSetting, mapIdToArr, byTwo }
