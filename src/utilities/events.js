import { keygen } from './keygen'

const events = {
  events: {},
  pub(eventName, data) {
    // grab callbacks or make empy sub object
    this.events[eventName] = this.events[eventName] || { data: null, subs: {} }
    const eventToPub = this.events[eventName]
    const callbacksToRun = eventToPub.subs
    // set the sub obj.data to the new data
    eventToPub.data = data
    // run any subbed callbacks
    Object.keys(callbacksToRun).forEach(key => {
      callbacksToRun[key](data)
    })
    // console.log(`pub-${eventName}: ${JSON.stringify(data)}`)
  },
  sub(eventName, fn, initCall) {
    // get events for this namespace, or make a new collection for subs
    this.events[eventName] = this.events[eventName] || { data: null, subs: {} }
    const { data } = this.events[eventName]
    // unique id so callback can be deleted later
    const subKey = keygen()
    // callback to return which will unsub from event
    const unsub = () => delete this.events[eventName].subs[subKey]
    // store the callback
    this.events[eventName].subs[subKey] = fn
    // if the subbed event has already been pubbed
    // go ahead and run the callback if they passed the parameter for it
    if (initCall && data) fn(data)

    return unsub
    // console.log(`sub-${eventName}: ${JSON.stringify(data)}`)
  },
}

export default events
