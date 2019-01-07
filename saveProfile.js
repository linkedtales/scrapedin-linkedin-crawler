const fs = require('fs')

module.exports = (fileName, content) => new Promise((resolve, reject) => {
  fs.writeFile("./crawledProfiles/" + fileName, JSON.stringify(content, undefined, 2), (err) => {
    if (err) return reject(err)
    resolve()
  })
})
