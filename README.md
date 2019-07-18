Scrapedin Linkedin Crawler
=======
[![Build Status](https://travis-ci.org/leonardiwagner/scrapedin-linkedin-crawler.svg?branch=master)](https://travis-ci.org/leonardiwagner/scrapedin-linkedin-crawler)
[![Coverage Status](https://coveralls.io/repos/github/leonardiwagner/scrapedin-linkedin-crawler/badge.svg?branch=master)](https://coveralls.io/github/leonardiwagner/scrapedin-linkedin-crawler?branch=master)

Crawls multiple linkedin public profiles based on initial given profiles. Unlikely other crawlers, Scrapedin Crawler is currently working for the new 2019 website. Each crawled profile is scraped using:  [scrapedin, a profile scraper library](https://github.com/leonardiwagner/scrapedin).

### How to use
1. Clone this  repository
2. Update `config.json` file with:
   * Your linkedin e-mail and password password or store it on `SCRAPEDIN_EMAIL` and `SCRAPEDIN_PASSWORD` envirorment variables. I recommend to not use your primary profile since it may be blocked.
   * keywords (optional): set words to filter next profiles to be crawled
   * root profiles: linkedin profiles urls that will start the crawler
3. Ensure you have Node.js >= 7.6 in your machine:
    * [You can download on offical website](https://nodejs.org/)
    * [Or use a NVM: aversion manager to use multiple Node.js versions on same machine](https://github.com/creationix/nvm#installation  )   
4. `npm install` to install dependencies
5. `npm start` to start crawler

### Tips
The profiles will be stored on the directory configured at `config.json` as individual file per profile. If you want to do something else (as saving on a database), just rewrite the `src/saveProfile.js` function.

### Contribuiting
Please feel free to contribute with this project, just always open an issue before submiting a PR.

### License

[Apache 2.0][apache-license]

[apache-license]:./LICENSE
