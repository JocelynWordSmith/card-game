import { keygen } from './keygen'

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

export default events
