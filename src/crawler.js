const logger = require('./logger')
const dependencies = {
  config: require('../config.json'),
  scrapProfile: require('./scrapProfile'),
  avoidAlreadyCrawled: require('./avoidAlreadyCrawled'),
}


module.exports = async (profileScraper, rootProfiles, injection) => new Promise((resolve) => {
  const {
    config,
    scrapProfile,
    avoidAlreadyCrawled
  } = Object.assign({}, dependencies, injection)


  const WORKER_INTERVAL_MS = config.workerIntervalWaitTime
  avoidAlreadyCrawled.updateAlreadyCrawledProfiles(rootProfiles)

  let currentProfilesToCrawl = rootProfiles
  let nextProfilesToCrawl = []
  

  let parallelCrawlers = 0
  const crawl = async (profileUrl) => {
    parallelCrawlers++
    logger.info(`starting scraping: ${profileUrl}`)

    scrapProfile(profileScraper, profileUrl)
      .then((relatedProfiles) => {
        if(config.avoidAlreadyCrawled){
          nextProfilesToCrawl = avoidAlreadyCrawled.getNextProfiles(nextProfilesToCrawl, relatedProfiles)
        } else {
          nextProfilesToCrawl = nextProfilesToCrawl.concat(relatedProfiles)
        }

        logger.info(`finished scraping: ${profileUrl} , ${relatedProfiles.length} profile(s) found!`)
        parallelCrawlers--
      })
      .catch((e) => {
        logger.error(`error on crawling profile: ${profileUrl} \n ${e}`)
        parallelCrawlers--
      })
  }

  setInterval(() => {
    if (currentProfilesToCrawl.length === 0 && nextProfilesToCrawl.length === 0) {
      logger.info('there is no profiles to crawl right now...')
    } else if (currentProfilesToCrawl.length === 0) {
      logger.info(`a depth of crawling was finished, starting a new depth with ${nextProfilesToCrawl.size} profile(s)`)
      currentProfilesToCrawl = nextProfilesToCrawl
      if (config.avoidAlreadyCrawled) {
        avoidAlreadyCrawled.updateAlreadyCrawledProfiles(nextProfilesToCrawl)
      }
      nextProfilesToCrawl = []
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
