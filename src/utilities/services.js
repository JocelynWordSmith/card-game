// this should contain utilities pertaining to getting, caching, and persiting data without knowledge of application flow/state
import * as GAME_DATA from '../../documents/TEMP_API_MOCK.json'

const payloads = {
  GAME_DATA: {
    response: null,
    url: null,
  },
}

const getPayload = (payloadId, force) =>
  new Promise(resolve => {
    let { response, url } = payloads[payloadId]
    if (!response || force) {
      // TODO replace with actual AJAX call
      return setTimeout(() => {
        response = GAME_DATA
        payloads[payloadId].response = response
        resolve(response)
      }, 500)
    }
    return resolve(response)
  })

export default getPayload
