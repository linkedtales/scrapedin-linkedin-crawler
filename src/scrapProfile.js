const dependencies = {
  extractRelatedProfiles: require('./extractRelatedProfiles'),
  saveProfile: require('./saveProfile'),
  logger: require('./logger'),
  config: require('../config.json'),
  getProfileIdFromUrl: require('./getIdFromProfileUrl')
}

module.exports = async (profileScraper, profileUrl, injection) => {
  const {
    extractRelatedProfiles,
    saveProfile,
    logger,
    getProfileIdFromUrl,
    config
  } = Object.assign({}, dependencies, injection)


  const profileId = getProfileIdFromUrl(profileUrl)
  const profile = await profileScraper('https://www.linkedin.com/in/' + profileId, config.profileLoadWaitTime)

  await saveProfile(profileId, profile)

  const related = await extractRelatedProfiles(profile, profileId)
  return related

}
