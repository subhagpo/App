#PheedBack App

PhoneGap day demo application that allows the users to participate in a survey using his/her mobile phone.
The user signs in using his/her FaceBook account and provides ratings to the questions by moving the phone. 

## Using the application - 
Once you sign in using your FB Account, the application presents the user with a series of questions on a stack of cards. 
The user tilts the phone left/right to rate the questions.  To flip to the next question, the user swipwes the card with his fingers and to submit 
the feedback, the user simply shakes the phone. 

## Getting Started - 
* Git Clone the workspace
* At the root, type "npm install"
* At the root, install the following plugins -
    * cordova-plugin-whitelist
    * cordova-plugin-inappbrowser
    * cordova-plugin-device-motion
    * cordova-plugin-hockeyapp
    * de.appplant.cordova.plugin.local-notification

## Building the application - 
 
 Once you enlist or sync to the git repo, remove all the previously added platforms and re-add them. This will also
 add the plugins since they are saved into the config.xml. Now add the platform and build using Cordova, Ionic or TACO CLI as,
    
    cordova/ionic/taco build/run/emulate [platform]
    
 ## Unit Testing the application - 
 
 The app can be tested by running
 
    gulp [test]
    
 which runs the unit tests defined at <root>/tests/unit.
 
  ## UI/Layout Testing the application - 
  
  To perform end to end layout testing, you would need to install the following pre-requisites
  * Appium (npm install -g appium)
  * Web-Driver (npm install -g wd) 
  
  
  Once, installed you can run the UI tests running on the emulator/device. 
  
  * First run appium server,
  
    $ appium
  
  * Run the actual tests, by running protractor from the root of the project, as  
  
    $ node_modules/protractor/bin/protractor tests/protractorlocal.config.js
  
    