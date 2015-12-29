/**
 * Created by omer on 12/23/2015.
 */
var q = require('q');
env = process.env;
var conf = require('../util/config');

describe("yield test", function () {
    var driver;

    before(function () {
        driver = conf.configDriver();
        return conf.testInit(driver);
    });
    after(function () {
        return driver.quit();
    });

    afterEach(function () {
    });

    it('test1 should succeed', function () {
        var done;
        q.spawn(function* () {
            console.log('Execution started');
            console.log('\nSauceOnDemandSessionID=' + driver.sessionID + ' job-name=' + env.SAUCE_TEST_NAME);
            yield q.allSettled([driver.elementByXPath('//div[@id="i_am_an_id"]').then(function(el) {
                return el.click();
            })]);
            yield q.allSettled([driver.elementByXPath('//textarea[@id="comments"]').then(function(el) {
                return el.sendKeys('blah blah');
            })]);
            yield q.allSettled([driver.elementByXPath('//div[@id="i_am_an_id"]').then(function(el) {
                return el.click();
            })]);
            conf.done = yield 1;
        });

        // block on the driver till all promises are done. If not, the test will end!!!
        return conf.blockDriverTillDone(driver, 100000, 1000, 5000);
    });
});

