/**
 * Created by omer on 12/23/2015.
 */
var conf = require('../util/config');
var fs = require('fs');

describe("Chaining test", function () {
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

    it('Chaining should succeed', function () {
        // this code assumes no failures. In production code you should allow fail-and-recover promises,
        // as elements may not be visible or get stale and you still want to succeed, under certain conditions
        return driver.elementByXPath('//div[@id="i_am_an_id"]').then(function(el) {
        return el.click().then(function() {
        return driver.elementByXPath('//textarea[@id="comments"]').then(function(el) {
        return el.sendKeys('blah blah').then(function() {
        return driver.elementByXPath('//div[@id="i_am_an_id"]').then(function(el) {
        return el.click().then(function () {
        // taking screenshot fails when using Appium
        return driver.takeScreenshot().then(function (image) {
        return fs.writeFile('screenshot.png', image, 'base64', function (err) {
            console.log('Screenshot: screenshot.png');
            if (err) {
                console.log(err);
            }
        }).then(null, function(err) {
            console.log('do something!!!');
        });});});});});});});});
    });
});

