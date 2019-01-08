const dependencies = {
  extractRelatedProfiles: require('./extractRelatedProfiles'),
  saveProfile: require('./saveProfile'),
  logger: require('./logger'),
  getProfileIdFromUrl: require('./getIdFromProfileUrl')
}

module.exports = async (profileScraper, profileUrl, injection) => {
  const {
    extractRelatedProfiles,
    saveProfile,
    logger,
    getIdFromProfileUrl
  } = Object.assign({}, dependencies, injection)

  try {
    const profileId = getIdFromProfileUrl(profileUrl)
    const profile = await profileScraper('https://www.linkedin.com/in/' + profileId)

    await saveProfile(profileId + '.json', profile)

    const related = await extractRelatedProfiles(profile, profileId)
    return related
  } catch (e) {
    logger.error(`error on crawling profile: ${profileUrl} \n ${e}`)
  }
}
