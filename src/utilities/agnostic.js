// This file should only contain vanilla methods without 3rd party dependencies
// avoid importing unless this file gets larger and needs to be split up

// This is for making unique keys when creating component collections without meaningful identifiers
// keeps it simple for now, might need a way to/manage keys later
const keygenClosure = function() {
  let count = 0
  return function nextKey() {
    count += 1
    return count
  }
}
// ensures there is only one 'keygen' number
const keygen = keygenClosure()

const events = {
  events: {},
  pub(eventName, data) {
    this.events[eventName] = this.events[eventName] || []
    this.events[eventName].forEach(obj => {
      obj.data = data
      obj.fn(data)
    })
  },
  sub(eventName, fn) {
    this.events[eventName] = this.events[eventName] || []
    this.events[eventName].push({
      fn,
      data: null,
    })
    const idx = this.events[eventName].length - 1
    return () => this.events[eventName].splice(idx, 1)
  },
  off(eventName, fn) {
    if (this.events[eventName]) {
      for (let i = 0; i < this.events[eventName].length; i += 1) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1)
          break
        }
      }
    }
  },
}

function counter(nameSpace, turns = 0) {
  return function add(sign) {
    if (sign) {
      turns += 1
      events.pub(nameSpace, {
        turns,
        sign,
      })
    }
    return turns
  }
}

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
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export { keygen, counter, events, gameSetting, shuffleArray }
