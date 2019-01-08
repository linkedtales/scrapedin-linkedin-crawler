const saveProfile = require('./saveProfile')
const { mock } = require('sinon')
const faker = require('faker')

describe('saveProfile', () => {
  const content = faker.lorem.text()
  const fileName = faker.lorem.word()
  const saveDirectory = faker.system.directoryPath()
  const config = { saveDirectory }

  it('create directory if doesn not exist', () => {
    const fs = {
      writeFileSync: mock()
        .withExactArgs(`${saveDirectory}/${fileName}.json`, JSON.stringify(content, undefined, 2))
        .returns(),
      existsSync: mock()
        .withExactArgs(saveDirectory)
        .returns(false),
      mkdirSync: mock()
        .withExactArgs(saveDirectory)
        .returns()
    }

    saveProfile(fileName, content, { config, fs })
    fs.writeFileSync.verify()
    fs.existsSync.verify()
    fs.mkdirSync.verify()
  })

  it('save the file with existing direcoty', () => {
    const fs = {
      writeFileSync: mock()
        .withExactArgs(`${saveDirectory}/${fileName}.json`, JSON.stringify(content, undefined, 2))
        .returns(),
      existsSync: mock()
        .withExactArgs(saveDirectory)
        .returns(true),
      mkdirSync: mock().never()
    }

    saveProfile(fileName, content, { config, fs })
    fs.writeFileSync.verify()
    fs.existsSync.verify()
    fs.mkdirSync.verify()
  })
})
