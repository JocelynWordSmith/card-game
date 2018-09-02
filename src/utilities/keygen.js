// This is for making unique keys when creating component collections without meaningful identifiers
// keeps it simple for now, might need a way to/manage keys later
const keygenClosure = function() {
  console.log('ERFVWERFVWERV')
  let count = 0
  return function nextKey() {
    count += 1
    return count
  }
}
// ensures there is only one 'keygen' number
const keygen = keygenClosure()

export { keygenClosure, keygen }
