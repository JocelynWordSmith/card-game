import nodeFetch from 'node-fetch'
import { get, set } from 'idb-keyval'

import * as MOCK_DATA from './TEMP_API_MOCK.json'

// webpack workaround for fetch/window conflict with node-fetch
// should be future proof as well
const fetch = nodeFetch

const payloads = {
  GAME_DATA: {
    data: null,
    url: 'https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json',
  },
}

Object.keys(payloads).forEach(key => {
  get(key)
    .then(val => {
      payloads[key].data = val
    })
    .catch(() => {
      payloads[key].data = null
    })
})

const getPayload = (payloadId, force) =>
  new Promise(resolve => {
    const { data, url } = payloads[payloadId]
    if (data && !force) resolve(data)

    fetch(url)
      .then(response => response.json())
      .then(json => {
        payloads[payloadId].data = json
        set(payloadId, json)
          .then(() => {
            resolve(json)
          })
          .catch(() => {
            resolve(json)
          })
      })
      .catch(() => {
        resolve(MOCK_DATA)
      })
  })

export default getPayload
