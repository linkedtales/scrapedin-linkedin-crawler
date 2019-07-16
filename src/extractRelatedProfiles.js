const dependencies = {
  config: require('../config.json')
}
module.exports = (profile, injection) => {
  const { relatedProfilesKeywords } = injection.config || dependencies.config



  return profile.peopleAlsoViewed.filter(({ text }) => {
    if(!relatedProfilesKeywords.length) return true

    if (text) {
      const t = text.toLowerCase()
      const hasFound = relatedProfilesKeywords.find((keyword) => t.includes(keyword.toLowerCase().trim()))

      return hasFound
    }

    return false
  }).map(({ user }) => user)
}
