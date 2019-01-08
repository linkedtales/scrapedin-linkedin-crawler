const crawler = require('./crawler')
const { stub, assert } = require('sinon')
const faker = require('faker')

const rootProfile1 = faker.internet.url()
const rootProfile2 = faker.internet.url()
const relatedProfile1 = faker.internet.url()
const relatedProfile2 = faker.internet.url()

const rootProfiles = [rootProfile1, rootProfile2]

const profileScraper = stub()

const scrapProfile = stub()
scrapProfile
  .withArgs(profileScraper, rootProfile1)
  .resolves([relatedProfile1])
scrapProfile
  .withArgs(profileScraper, rootProfile2)
  .resolves([relatedProfile2])
scrapProfile
  .withArgs(profileScraper, relatedProfile1)
  .resolves([])
scrapProfile
  .withArgs(profileScraper, relatedProfile2)
  .resolves([])

describe('crawler', () => {
  it('should crawl', async () => {
    await crawler(profileScraper, rootProfiles, { scrapProfile })

    assert.callCount(scrapProfile, 4)
  }).timeout(10000)
})
