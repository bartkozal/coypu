module.exports = {
  'default e2e tests': function (browser) {
    browser
      .url(browser.globals.devServerURL)
      .end()
  }
}
