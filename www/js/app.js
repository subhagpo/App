// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', "firebase", 'ui.bootstrap', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    } 
    
    // Register to hockey app
    hockeyapp.start(function() {
        console.log("success");
    }, function (err) {
        console.log("error:" + err);
    }, "[HOCKET APP ID]", true);
   
    /* Invoke sync with the custom options, which enables user interaction.
       For customizing the sync behavior, see SyncOptions in the CodePush documentation. 
    */
    window.codePush.sync(
        function (syncStatus) {
            switch (syncStatus) {
                // Result (final) statuses
                case SyncStatus.UPDATE_INSTALLED:
                    displayMessage("The update was installed successfully. The changes will be visible after application restart. ");
                    break;
                case SyncStatus.UP_TO_DATE:
                    displayMessage("The application is up to date.");
                    break;
                case SyncStatus.UPDATE_IGNORED:
                    displayMessage("The user decided not to install the optional update.");
                    break;
                case SyncStatus.ERROR:
                    displayMessage("An error occured while checking for updates");
                    break;
                
                // Intermediate (non final) statuses
                case SyncStatus.CHECKING_FOR_UPDATE:
                    console.log("Checking for update.");
                    break;
                case SyncStatus.AWAITING_USER_ACTION:
                    console.log("Alerting user.");
                    break;
                case SyncStatus.DOWNLOADING_PACKAGE:
                    console.log("Downloading package.");
                    break;
                case SyncStatus.INSTALLING_UPDATE:
                    console.log("Installing update");
                    break;
            }
        },
        {
            installMode: InstallMode.ON_NEXT_RESTART, updateDialog: true
        },
        function (downloadProgress) {
            console.log("Downloading " + downloadProgress.receivedBytes + " of " + downloadProgress.totalBytes + " bytes.");
        }); 
        
        // Displays an alert dialog containing a message.
        var displayMessage = function (message) {
        navigator.notification.alert(
            message,
            null,
            'CodePush',
            'OK');
        }   
  });   
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'AppCtrl'
  })

  .state('tab.feedback', {
      url: '/feedback',
      views: {
        'tab-feedback': {
          templateUrl: 'templates/tab-feedback.html',
          controller: 'FeedbackCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/account');

});
