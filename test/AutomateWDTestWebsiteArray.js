/**
 * Created by omer on 12/23/2015.
 */
var conf = require('../util/config');
var q = require('q');

describe("Array test", function () {
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

    it('Array should succeed', function () {
        var promises = [];
        var result = driver.elementByXPath('//div[@id="i_am_an_id"]').then(function(el) {
            return el.click();
        });
        promises.push(driver.elementByXPath('//textarea[@id="comments"]').then(function(el) {
            return el.sendKeys('blah blah');
        }));
        promises.push(driver.elementByXPath('//div[@id="i_am_an_id"]').then(function(el) {
            return el.click();
        }));
        promises.forEach(function (p) {
            result = result.then(q.allSettled([p]));
        });
        return result;
    });
});

