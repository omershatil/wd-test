/**
 * Created by omer on 12/23/2015.
 */
var q = require('q');
env = process.env;
var conf = require('../util/config');

// NOTE: the main thread will return. Then the unresolved promises will get resolved!
/*
driver = conf.configDriver();
q.spawn(function* () {
    console.log('Execution started');
    yield q.allSettled([driver.init(conf.getAppiumDesiredCapabilities())]);
    yield q.allSettled([driver.setImplicitWaitTimeout(Number(env.IMPLICIT_WAIT_MS))]);
    console.log('\nSauceOnDemandSessionID=' + driver.sessionID + ' job-name=' + env.SAUCE_TEST_NAME);
    yield q.allSettled([driver.get(env.TEST_URL)]);
    yield q.allSettled([driver.elementByXPath('//div[@id="i_am_an_id"]').then(function(el) {
        return el.click();
    })]);
    yield q.allSettled([driver.elementByXPath('//textarea[@id="comments"]').then(function(el) {
        return el.sendKeys('blah blah');
    })]);
    yield q.allSettled([driver.elementByXPath('//div[@id="i_am_an_id"]').then(function(el) {
        return el.click();
    })]);
    yield driver.quit();
});
*/

console.log('done');
