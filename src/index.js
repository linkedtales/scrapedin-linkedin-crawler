const scrapedin = require('scrapedin')
const configFile = require('../config.json')
const crawl = require('./crawler')

const config = {
  email: process.env.SCRAPEDIN_EMAIL || configFile.email,
  password: process.env.SCRAPEDIN_PASSWORD || configFile.password,
  hasToLog: configFile.hasToLog,
  isHeadless: configFile.isHeadless,
  puppeteerArgs: configFile.puppeteerArgs
}

if(configFile.cookiesFile && configFile.cookiesFile.length) {
  const fs = require('fs')
  const cookies = fs.readFileSync(configFile.cookiesFile)
  config.cookies = JSON.parse(cookies)
}

scrapedin(config)
  .then((profileScraper) => crawl(profileScraper, configFile.rootProfiles))
