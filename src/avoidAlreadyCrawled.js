let alreadyCrawledProfiles = new Set()

const getNextProfiles = (nextProfilesToCrawl, relatedProfiles) => {
  const additionalProfiles = difference(new Set(relatedProfiles),
                                  alreadyCrawledProfiles)

  const next = union(nextProfilesToCrawl,
  additionalProfiles)

  return Array.from(next)
}

const updateAlreadyCrawledProfiles = (profiles) => {
  alreadyCrawledProfiles = union(alreadyCrawledProfiles,
    profiles)
}

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

module.exports = {
  getNextProfiles,
  updateAlreadyCrawledProfiles
}

