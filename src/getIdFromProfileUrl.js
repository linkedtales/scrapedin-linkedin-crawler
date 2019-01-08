module.exports = (url) => {
  const inIndex = url.indexOf('in/') + 3
  const id = url.substring(inIndex).replace('/', '')
  return id
}
