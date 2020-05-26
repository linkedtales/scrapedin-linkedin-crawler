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
  let alreadyCrawledProfiles = new Set(rootProfiles)
  let nextProfilesToCrawl = new Set()
  let additionalProfiles = new Set()

  let parallelCrawlers = 0
  const crawl = async (profileUrl) => {
    parallelCrawlers++
    logger.info(`starting scraping: ${profileUrl}`)

    scrapProfile(profileScraper, profileUrl)
      .then((relatedProfiles) => {
          additionalProfiles = difference(new Set(relatedProfiles), alreadyCrawledProfiles)
	  logger.info(additionalProfiles)
          nextProfilesToCrawl = union(nextProfilesToCrawl,
                                      additionalProfiles)

        logger.info(`finished scraping: ${profileUrl} , ${relatedProfiles.length} profile(s) found!`)
        parallelCrawlers--
      })
      .catch((e) => {
        logger.error(`error on crawling profile: ${profileUrl} \n ${e}`)
        parallelCrawlers--
      })
  }

  setInterval(() => {
    if (currentProfilesToCrawl.length === 0 && nextProfilesToCrawl.size === 0) {
      logger.info('there is no profiles to crawl right now...')
    } else if (currentProfilesToCrawl.length === 0) {
      logger.info(`a depth of crawling was finished, starting a new depth with ${nextProfilesToCrawl.size} profile(s)`)
	currentProfilesToCrawl = Array.from(nextProfilesToCrawl)
	alreadyCrawledProfiles = union(alreadyCrawledProfiles, new Set(currentProfilesToCrawl))
      nextProfilesToCrawl = new Set()
    } else if (parallelCrawlers < config.maxConcurrentCrawlers) {
      const profileUrl = currentProfilesToCrawl.shift()
      crawl(profileUrl)
    }
  }, WORKER_INTERVAL_MS)
})


function union(setA, setB) {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}


function difference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}
