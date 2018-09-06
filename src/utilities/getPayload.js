import fetch from 'node-fetch'
import { get, set } from 'idb-keyval'

// offline backup
import * as MOCK_DATA from '../assets/content/TEMP_API_MOCK.json'

const payloads = {
  GAME_DATA: {
    prefetch: true,
    data: null,
    url: 'https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json',
  },
}

// prefetch payloads before requested if configured to
Object.keys(payloads).forEach(key => {
  const doFetch = payloads[key].prefetch
  const forceFetch = payloads[key].force
  const hasData = payloads[key].data
  const shouldGetIt = forceFetch || !hasData
  if (doFetch && shouldGetIt) {
    get(key)
      .then(val => {
        payloads[key].data = val
      })
      .catch(() => {
        payloads[key].data = null
      })
  }
})

const getPayload = (payloadId, force) =>
  new Promise(resolve => {
    const { data, url } = payloads[payloadId]
    // check if we have the data
    // if we don't OR param force === true
    if (data && !force) resolve(data)
    // fetch the data
    fetch(url)
      .then(response => response.json())
      .then(json => {
        // hold on to what ya got
        payloads[payloadId].data = json
        set(payloadId, json)
          .then(() => {
            resolve(json)
          })
          .catch(error => {
            // if we cant save the data, we still hand it back to the method that requested it
            resolve(json)
            // node has no indexedDb
            // this is commented to keep noise out of build
            // throw error
          })
      })
      .catch(error => {
        // if we cant get the data, we still hand back what we have to the method that requested it
        resolve(data || MOCK_DATA)
        // node has no indexedDb
        // this is commented to keep noise out of build
        // throw error
      })
  })

export default getPayload
