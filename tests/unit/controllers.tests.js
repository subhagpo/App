describe("Controllers: AppCtrl", function() {
    var scope, fbase, ctrl, $rootScope, $ionicModal, $controller, $httpBackend, expected={}, authData;

    beforeEach(function() {
        module('ngMock', "starter.controllers", function($provide) {
            var $Modal = jasmine.createSpyObj('$ionicModal', ['fromTemplateUrl']);
            $Modal.fromTemplateUrl.and.returnValue(successCallback);
            $provide.value('$ionicModal', $Modal);

            var spyArray = jasmine.createSpy('$firebaseArray').and.returnValue([]);
            $provide.value('$firebaseArray', spyArray);

            var modal = jasmine.createSpy('$cordovaLocalNotification').and.returnValue(expected);
            $provide.value('$cordovaLocalNotification', modal);
            fbase = jasmine.createSpyObj('Firebase', ['on', '$add', 'authWithOAuthPopup', 'once']);
            _firebase(); 
        });
    });

    function _firebase() {
        Firebase = function () {
            this.on=  function(){
                return true;
            }
            this.$add = function() {
                return;
            }
            this.authWithOAuthPopup = function() {

                authData = {
                    id: 1
                };
                return authData;
            }
            this.once = function() {
                return;
            }
        }
    }

    var successCallback = {
       then: function(modallogin){
            scope.modallogin = modallogin;
            modallogin.hide = function(){};
        }
    };

    beforeEach(inject(function(_$controller_, _$rootScope_, $httpBackend, $ionicModal, $injector, $firebaseArray) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $httpBackend = $httpBackend;
        scope = $rootScope.$new();

        ctrl = $controller('AppCtrl', {
            $scope: scope,
        });

        scope.$apply();
    }));


    describe("test firebase", function() {
        it('should initialize all firebase methods', function() {
            expect(fbase.on).toBeDefined();
            expect(fbase.$add).toBeDefined();
            expect(fbase.authWithOAuthPopup).toBeDefined();

        })
        it("should make a call to firebase auth service and populate authData", function() {
            scope.login();
            expect(authData).toBeDefined();
            expect(authData.id).toBe(1);
       })
    })
})

describe('Controllers: FeedbackCtrl', function(){
    var scope;
    var ionicSlideBoxDelegate;
    var questions;
    var FeedbackCtrl;

    // load the controller's module
    beforeEach(module('ngMock','starter.controllers', function($provide) {
        var $Modal = jasmine.createSpyObj('$ionicModal', ['fromTemplateUrl']);
        $Modal.fromTemplateUrl.and.returnValue(successCallback);
        $provide.value('$ionicModal', $Modal);

        ionicSlideBoxDelegate = jasmine.createSpyObj('$ionicSlideBoxDelegate', ['next', 'currentIndex', 'previous']);

        questions = jasmine.createSpyObj('Questions', ['all']);
        questions.all.and.returnValue(questionsArray);
        $provide.value('Questions', questions);
    }));
       

    var successCallback = {
       then: function(modal){
            scope.modal_login = modal;
        }
    };

    var questionsArray = [
        {q1: 'Here is a test question', Rating: null},
        {q2: 'Here is a test question', Rating: null},
        {q3: 'Here is a test question', Rating: null}         
    ];

    function onSuccess() {
        var acceleration = { x: 12, y:13, z:14 };
        return acceleration;
    }


    beforeEach(inject(function($rootScope, $controller, _$window_) {
        scope = $rootScope.$new();
        $window = _$window_;        
        navigator = $window.navigator;
        
        $window.navigator = {
            accelerometer: {
                watchAcceleration : onSuccess
            } 
        };

        FeedbackCtrl = $controller('FeedbackCtrl', {
            $scope: scope,
            $window : window,
            $ionicSlideBoxDelegate : ionicSlideBoxDelegate,
            Questions : questions
        });
    }));

    describe('Upon initialization', function() {
        it('should get an instance of my factory', inject(function(Questions) {
            expect(Questions).toBeDefined();
            expect(scope.questions.length).toBe(3);
        }));

        it('should set the parameters of progress bar correctly', function(){
            expect(scope.dynamic).toEqual(5);
            expect(scope.max).toEqual(10);
        });
        
        it('should flag survey submitted parameter to false', function(){
           expect(FeedbackCtrl.surveySubmitted).toBe(false);
        });
    })

    describe('SlideBoxDelegate', function() {
         it('should move to next slide when next button is clicked', function(){
            scope.next();
            scope.$apply();
            expect(ionicSlideBoxDelegate.next).toHaveBeenCalled();
        });

        it('should move to previous slide when previous button is clicked', function(){
            scope.previous();
            scope.$apply();
            expect(ionicSlideBoxDelegate.previous).toHaveBeenCalled();
        });

        it('should start rendering questions on slide 1', function(){
            expect(scope.prev).toEqual(0);
        });

        it('should update prev index appropriately', function(){
            scope.slideHasChanged(1);
            expect(scope.prev).toEqual(1);

            scope.slideHasChanged(2);
            expect(scope.prev).not.toEqual(1);
        });

        it('should reset the dynamic value to 5', function() {
            scope.dynamic = 8;
            scope.slideHasChanged(2);
            expect(scope.dynamic).toEqual(5);
        })

        it('should not update anything once index goes past length of questions', function() {
            scope.dynamic = 8;
            scope.slideHasChanged(4); // number of questions = 3
            expect(scope.prev).toEqual(0);
            expect(scope.dynamic).toEqual(8);
        })        
    })
    
    describe('rateAgain', function() {
        it('should reset the rating if rate again button is pressed', function() {
            scope.questions[scope.prev].Rating = 8;
            scope.rateAgain();
            expect(scope.questions[scope.prev].Rating).toBeNull();
        })
    })
    
    describe('detect shaking', function() {
        function _shakeSetup() {
            var result = { x: 1, y:2, z:3};
            spyOn(scope, 'submitSurvey');
            scope.detectShake(result);
            scope.$apply();
        }

        it('If past threshold [30], submitSurvey should be called', function() {   
            scope.previousMeasurements = {x:10, y:11, z:12};
            _shakeSetup();
            expect(scope.submitSurvey).toHaveBeenCalled(); 
        })

        it('If below threshold [30], submitSurvey should be called', function() {
            scope.previousMeasurements = { x: 1, y:2, z:3};
            _shakeSetup(); 
            expect(scope.submitSurvey).not.toHaveBeenCalled();
        })
    })
});
