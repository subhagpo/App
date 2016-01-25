exports.config = {
    framework: 'jasmine2',
    seleniumAddress: 'http://ondemand.saucelabs.com:80/wd/hub',
    specs: ['e2e/*.tests.js'],
    capabilities: {
        browserName: '',
        appiumVersion: '1.4.11',
        deviceName: 'Google Nexus 7 HD Emulator',
        deviceOrientation: 'portrait',
        platformName: 'Android',
        app: 'sauce-storage:android-debug.apk',
        autoWebview: true,
        chromeOptions: {
            androidActivity: "pheedback.pheedback.MainActivity",
            androidPackage: "pheedback.pheedback"
        }
    },
    onPrepare: function() {
        var jasmineReporters = require('jasmine-reporters');
        var junitReporter = new jasmineReporters.JUnitXmlReporter({
            savePath: 'bin/test',
            consolidateAll: false,
            filePrefix: 'TESTS-E2E-'
        });
        jasmine.getEnv().addReporter(junitReporter);
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
}