// script.js

// create the module and name it MyApp
// also include ngRoute for all our routing needs
var MyApp = angular.module('MyApp', ['ngRoute']);

// configure our routes
MyApp.config(function($routeProvider, $locationProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'views/home.html',
            controller  : 'mainController'
        })

        // route for the books page
        .when('/quiz', {
            templateUrl : 'views/quiz.html',
            controller  : 'quizController'
        });

    $locationProvider.html5Mode(true);
});

// create the controller and inject Angular's $scope
MyApp.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Guess the word.';
});

MyApp.controller('quizController', function($scope, $http) {

    $scope.completed = false;
    $scope.number = 0;
    $scope.answer = '';
    $scope.answers = [];
    $scope.quiz = [
        {
            answer: 'DATE',
            answered: 'false',
            img1: "assets/Date/1.png",
            img2: "assets/Date/2.png",
            img3: "assets/Date/3.png",
            img4: "assets/Date/4.png"
        },
        {
            answer: 'SIGN',
            answered: 'false',
            img1: "assets/Sign/1.png",
            img2: "assets/Sign/2.png",
            img3: "assets/Sign/3.png",
            img4: "assets/Sign/4.png"
        },
        {
            answer: 'BILL',
            answered: 'false',
            img1: "assets/Bill/1.png",
            img2: "assets/Bill/2.png",
            img3: "assets/Bill/3.png",
            img4: "assets/Bill/4.png"
        }
    ];
    $scope.check = function(){
        console.log(this.answer);
        if(this.answer.toUpperCase()==$scope.quiz[$scope.number].answer){            
            this.answers.push(this.answer.toUpperCase());
            if($scope.number==$scope.quiz.length-1){
                $scope.completed = true;
            }
            $scope.quiz[$scope.number].answered = true;
            $scope.number++;
            this.answer = "";
            Materialize.toast('Correct!', 4000);
            $scope.disp = $scope.quiz[$scope.number].answer.replace(/./g, '_ ');
        }else{
            this.answers.push(this.answer);
            this.answer = "";
            Materialize.toast('Wrong!', 4000);
        }
        console.log($scope.completed);
    };

    $scope.disp = $scope.quiz[$scope.number].answer.replace(/./g, '_ ');

    $scope.checkAnswers = false;
    $scope.checkAnswer = function(){
        console.log("tidert");
        $scope.checkAnswers = !$scope.checkAnswers;
    };
});