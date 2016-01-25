exports.config = {
    framework: 'jasmine2',

    seleniumAddress:"http://localhost:4723/wd/hub",
    capabilities: {
            // Android device capabilities
            app: '/Users/subhagpo/Desktop/Apps/PhoneGapDay/platforms/android/build/outputs/apk/android-debug.apk',
            device: 'android',
            'browserName': '',
            'deviceName' : 'emulator-5554',
            'platformName' : 'Android',
            autoWebview: true,
    },
    specs: [
        // actual test specs for e-2-e UI/Layout tests
        'e2e/*.tests.js'
    ],
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true,
    },
    allScriptsTimeout: 20000,
    onPrepare: function(){
        var wd = require('wd'),
        protractor = require('protractor'),
        wdBridge = require('wd-bridge')(protractor, wd);
        wdBridge.initFromProtractor(exports.config);
    }
};