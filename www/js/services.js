angular.module('starter.services', ['firebase'])

.factory ("Questions", function($firebase, $firebaseArray) {
    var questionsRef = new Firebase("https://poll2roll.firebaseio.com/questions");
    var questions = $firebaseArray(questionsRef);  
    
    return {
    all: function() {
      return questions;
    },
    get: function(id) {
      for (var i = 0; i < questions.length; i++) {
        if (questions[i].Id === parseInt(id)) {
          return questions[i];
        }
      }
      return null;
    }
  };
});