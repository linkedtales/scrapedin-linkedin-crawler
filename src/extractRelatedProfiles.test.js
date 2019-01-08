const extractRelatedProfiles = require('./extractRelatedProfiles')
const { expect } = require('chai')
const faker = require('faker')

describe('extractRelatedProfiles', () => {
  it('should extract related profiles', () => {
    const expectedUrl = faker.internet.url()
    const sameKeyword = faker.lorem.word()
    const config = {
      relatedProfilesKeywords: [faker.lorem.word(), sameKeyword]
    }
    const profile = {
      peopleAlsoViewed: [
        { user: expectedUrl, text: `some ${sameKeyword} text` }
      ]
    }

    const result = extractRelatedProfiles(profile, { config })
    expect(result).to.deep.equals([expectedUrl])
  })

  it('should not extract related profiles if text does not contain keyword', () => {
    const expectedUrl = faker.internet.url()
    const sameKeyword = faker.lorem.word()
    const config = {
      relatedProfilesKeywords: [faker.lorem.word(), sameKeyword]
    }
    const profile = {
      peopleAlsoViewed: [
        { user: expectedUrl, text: `some text` }
      ]
    }

    const result = extractRelatedProfiles(profile, { config })
    expect(result).to.deep.equals([])
  })
})
