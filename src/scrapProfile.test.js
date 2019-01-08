const scrapProfile = require('./scrapProfile')
const { mock } = require('sinon')
const { expect } = require('chai')
const faker = require('faker')

describe('scrapProfile', () => {
  const profileUrl = `https://www.linkedin.com/in/${faker.lorem.word()}`
  const profile = faker.lorem.text()
  const expectedResult = faker.random.arrayElement()
  const profileScraper = mock()
    .resolves(profile)
  const extractRelatedProfiles = mock()
    .resolves(expectedResult)
  const saveProfile = mock()
    .resolves()
  const getIdFromProfileUrl = mock().returns()

  const injection = { extractRelatedProfiles, saveProfile, getIdFromProfileUrl }

  it('scrap', async () => {
    const result = await scrapProfile(profileScraper, profileUrl, injection)
    expect(result).to.equals(expectedResult)

    profileScraper.verify()
    extractRelatedProfiles.verify()
    saveProfile.verify()
  })
})
