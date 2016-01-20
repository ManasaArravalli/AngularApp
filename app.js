var animateApp = angular.module('animateApp', ['ngRoute']);

animateApp.config(function($routeProvider) {
    $routeProvider
    .when('/home', {
        templateUrl: 'home2.html',
        controller: 'mainController'
    })
    .when('/about', {
        templateUrl: 'jqueryfadeIn.html',
        controller: 'aboutController'
    })
    .when('/contact', {
        templateUrl: 'animate.html',
        controller: 'contactController'
    })
    .when('/login', {
        templateUrl: 'login.html',
        controller: 'LoginCtrl'
    })
    .when('/quiz', {
        templateUrl: 'template.html'
    })
    .when('/slide', {
        templateUrl: 'slideshow.html',
        controller: 'slideCtrl'
    });

    $routeProvider.otherwise({ redirectTo: '/login' });
    

});

animateApp.controller('mainController', function($scope) {
    $scope.pageClass = 'page-home';
});

animateApp.controller('aboutController', function($scope) {
    $scope.pageClass = 'page-about';
});

animateApp.controller('contactController', function($scope) {
    $scope.pageClass = 'page-contact';
});

animateApp.controller('LoginCtrl', function($scope, $http, $location, authentication) {
  $scope.login = function() {
    if ($scope.username === 'admin' && $scope.password === 'pass') {
      authentication.isAuthenticated = true;
      authentication.user = { name: $scope.username };
      $location.url("/home");
  } else {
      $scope.loginError = "Invalid username/password combination";
      console.log('Login failed..');
  };
};
});

animateApp.factory('authentication', function() {
  return {
    isAuthenticated: false,
    user: null
}
});
animateApp.controller("TopController", [ '$scope', '$timeout', function($scope, $timeout) {
    $scope.loaded = true;    
    $scope.title = "";

    $timeout(function() { $scope.loaded = true; }, 2000);
}]);

animateApp.controller('slideCtrl', function ($scope) {


    $scope.photos = [
    {src: 'img1.png', desc: 'Jquery'},
    {src: 'img2.png', desc: 'Jquery2'},
    {src: 'img3.png', desc: 'Jquery3'},
    {src: 'img1.png', desc: 'Jquery4'},
    {src: 'img2.png', desc: 'Jquery5'},
    {src: 'img3.png', desc: 'Jquery6'}
    ];

    $scope._Index = 0;

    // if a current image is the same as requested image
    $scope.isActive = function (index) {
        return $scope._Index === index;
    };

    // show prev image
    $scope.showPrev = function () {
        $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
    };

    // show next image
    $scope.showNext = function () {
        $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
    };

    // show a certain image
    $scope.showPhoto = function (index) {
        $scope._Index = index;
    };
});

animateApp.directive('quiz', function(quizFactory) {
    var id,
    quizOver,
    inProgress,
    question,
    options,
    answer,
    answerMode,
    correctAns,
    score;
    function start() {

        id = 0;
        quizOver = false;
        inProgress = true;
        getQuestion();
    };

    function reset() {
        inProgress = false;
        score = 0;
    }

    function getQuestion() {
        var q = quizFactory.getQuestion(id);
        if(q) {
            question = q.question;
            options = q.options;
            answer = q.answer;
            answerMode = true;
        } else {
            quizOver = true;
        }
    };

    function checkAnswer() {
        if(!$('input[name=answer]:checked').length) return;

        var ans = $('input[name=answer]:checked').val();

        if(ans == options[answer]) {
            score++;
            correctAns = true;
        } else {
            correctAns = false;
        }
        answerMode = false;
    };

    function nextQuestion() {
        id++;
        getQuestion();
    }

    function reset(){
    }
    return {
        restrict: 'AE',
        scope: {},
        link: function(scope, elem, attrs) {
            elem.click(function(){
                start();
            })
        }
    }
});

animateApp.factory('quizFactory', function() {
    var questions = [
    {
        question: "Which of the following is correct?",
        options: ["jQuery is a JavaScript Library", "jQuery is a JSON Library"],
        answer: 0
    },
    {
        question: "Which sign does jQuery use as a shortcut for jQuery?",
        options: ["the $ sign", "the % sign", "the ? sign", "the @ sign"],
        answer: 0
    },
    {
        question: "Is it possible to use jQuery together with AJAX?",
        options: ["Yes", "No"],
        answer: 0
    },
    {
        question: "Which jQuery method is used to hide selected elements?",
        options: ["display(none)", "hidden()", "hide()", "visible(false)"],
        answer: 2
    },
    {   
        question: "What scripting language is jQuery written in?",
        options: ["JavaScript", "C#", "VB Script", "C++"],
        answer: 0
    }
    ];

    return {
        getQuestion: function(id) {
            if(id < questions.length) {
                return questions[id];
            } else {
                return false;
            }
        }
    };
});



/*animateApp.controller('AppCtrl', function($scope, authentication) {
  $scope.templates =
  [
  { url: 'login.html' },
  { url: 'home.html' }
  ];
  $scope.template = $scope.templates[0];
  $scope.login = function (username, password) {
    if ( username === 'admin' && password === '1234') {
      authentication.isAuthenticated = true;
      $scope.template = $scope.templates[1];
      $scope.user = username;
    } else {
      $scope.loginError = "Invalid username/password combination";
    };
  };
  
});*/

/*animateApp.controller('HomeCtrl', function($scope, authentication) {
  $scope.user = authentication.user.name;
}); */

