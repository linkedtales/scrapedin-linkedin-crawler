const logger = require('./logger')
const dependencies = {
  config: require('../config.json'),
  scrapProfile: require('./scrapProfile')
}

const WORKER_INTERVAL_MS = 1000

module.exports = async (profileScraper, rootProfiles, injection) => new Promise((resolve) => {
  const {
    config,
    scrapProfile
  } = Object.assign({}, dependencies, injection)

  let currentProfilesToCrawl = rootProfiles
  let nextProfilesToCrawl = []

  let parallelCrawlers = 0
  const crawl = async (profileUrl) => {
    parallelCrawlers++
    logger.info(`starting scraping: ${profileUrl}`)

    try{
      const relatedProfiles = await scrapProfile(profileScraper, profileUrl)
      nextProfilesToCrawl = nextProfilesToCrawl.concat(relatedProfiles)
    } catch (e) {
      logger.error(`error on crawling profile: ${profileUrl} \n ${e}`)
    }
    

    logger.info(`finished scraping: ${profileUrl} , ${relatedProfiles.length} profile(s) found!`)
    parallelCrawlers--
  }

  setInterval(() => {
    if (currentProfilesToCrawl.length === 0 && nextProfilesToCrawl.length === 0) {
      logger.info('there is no profiles to crawl right now...')
    } else if (currentProfilesToCrawl.length === 0) {
      logger.info(`a depth of crawling was finished, starting a new depth with ${nextProfilesToCrawl.length} profile(s)`)
      currentProfilesToCrawl = nextProfilesToCrawl
      nextProfilesToCrawl = []
    } else if (parallelCrawlers < config.maxConcurrentCrawlers) {
      const profileUrl = currentProfilesToCrawl.shift()
      crawl(profileUrl)
    }
  }, WORKER_INTERVAL_MS)
})
