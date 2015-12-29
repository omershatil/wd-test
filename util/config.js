/**
 * Created by omer on 12/29/2015.
 */
/**
 * Config the Appium driver.
 * @returns {*}
 */
var configDriver = exports.configDriver = function() {
    var webdriver;
    var serverConfig;
    // import webdriver client for Appium
    webdriver = require("wd");
    if (env.USE_SAUCE_LABS === 'true') {
        return webdriver.promiseRemote(env.SAUCE_URL, env.SAUCE_PORT, env.SAUCE_USERNAME, env.SAUCE_ACCESS_KEY);
    }
    else {
        // TODO: haven't completed this
        return webdriver.promiseRemote(serverConfig);
    }
};
/**
 * Initialize the test.
 * @returns {*}
 */
var testInit = exports.testInit = function(driver) {
    return driver.init(exports.getAppiumDesiredCapabilities()).then(function() {
        return driver.setImplicitWaitTimeout(Number(env.IMPLICIT_WAIT_MS)).then(function() {
            console.log('\nSauceOnDemandSessionID=' + driver.sessionID + ' job-name=' + env.SAUCE_TEST_NAME);
            return driver.get(env.TEST_URL);
        });});
};

/*** Returns desired capabilites. Since Appium's configuration is after the initialization of the driver (unlike with
 * Selenium, we call this method from testInit().
 * @returns {*}
 */
var getAppiumDesiredCapabilities = exports.getAppiumDesiredCapabilities = function() {
    var desired;
    if (env.USE_SAUCE_LABS === 'true') {
        desired = {
            browserName: env.SAUCE_BROWSER,
            platformName: env.SAUCE_PLATFORM_NAME,
            // TODO: seems like sometimes (when?) version is used, and others, platformVersion is used
            version: env.SAUCE_PLATFORM_VERSION,
            platformVersion: env.SAUCE_PLATFORM_VERSION,
            deviceName: env.SAUCE_DEVICE_NAME,
            // How long (in seconds) Appium will wait for a new command from the client before assuming the
            // client quit and ending the session
            newCommandTimeout: env.SAUCE_NEW_COMMAND_TIMEOUT,
            deviceOrientation: env.SAUCE_DEVICE_ORIENTATION,
            automationName: env.SAUCE_AUTOMATION_NAME,
            name: env.SAUCE_TEST_NAME,
            captureHtml: env.CAPTURE_HTML,
            autoAcceptAlerts: true, // automatically dismiss the apple dialogs. (see SauceLabs Appium configuration)
            build: env.JENKINS_BUILD_NUMBER
        };
        serverConfig = {
            host: env.SAUCE_URL,
            port: env.SAUCE_PORT
        };
    }
    else {
        desired = {
            browserName: env.SAUCE_BROWSER,
            appiumVersion: env.APPIUM_VERSION,
            platformName: env.SAUCE_PLATFORM_NAME,
            platformVersion: env.SAUCE_PLATFORM_VERSION,
            deviceName: env.SAUCE_DEVICE_NAME,
            avd: env.APPIUM_AVD,
            // How long (in seconds) Appium will wait for a new command from the client before assuming the
            // client quit and ending the session
            newCommandTimeout: env.SAUCE_NEW_COMMAND_TIMEOUT,
            autoAcceptAlerts: true // automatically dismiss the apple dialogs. (see SauceLabs Appium configuration)
        };
        serverConfig = {
            host: 'localhost',
            port: 4723
        };
    }
    return desired;
};
