const scrapedin = require('scrapedin')
const configFile = require('../config.json')
const crawl = require('./crawler')

const config = {
  email: process.env.SCRAPEDIN_EMAIL || configFile.email,
  password: process.env.SCRAPEDIN_PASSWORD || configFile.password,
  relatedProfilesKeywords: configFile.relatedProfilesKeywords,
  maxConcurrentCrawlers: configFile.maxConcurrentCrawlers,
  hasToLog: configFile.hasToLog,
  rootProfiles: configFile.rootProfiles,
  isHeadless: false
}

scrapedin(config)
  .then((profileScraper) => crawl(profileScraper, config.rootProfiles))
