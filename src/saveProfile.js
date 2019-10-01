const dependencies = {
  fs: require('fs'),
  config: require('../config.json')
}

module.exports = (profileId, content, injection) => {
  const { fs, config } = Object.assign({}, dependencies, injection)

  if (!fs.existsSync(config.saveDirectory)) {
    fs.mkdirSync(config.saveDirectory, { recursive: true })
  }

  return fs.writeFileSync(`${config.saveDirectory}/${profileId}.json`, JSON.stringify(content, undefined, 2))
}
