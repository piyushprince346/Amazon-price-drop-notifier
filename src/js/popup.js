let amazonextension = angular.module("amazonextension", ['ui.router']);
amazonextension.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '../html/home.html',
        })
        .state('login', {
            url: '/login',
            templateUrl: '../html/login.html'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: '../html/signup.html'
        })
        .state('welcome', {
            url: '/welcome',
            params: {
                "user": null
            },
            controller: function ($scope, $stateParams) {
                $scope.user = $stateParams.user;
                console.log($stateParams.user);
            },
            templateUrl: '../html/welcome.html'
        })
        .state('errorAuth', {
            url: '/error-auth',
            templateUrl: '../html/errorAuth.html'
        })

    $urlRouterProvider.otherwise('/home')
}]);
amazonextension.controller('SignUpFormController', ['$scope', '$state', function ($scope, $state) {
    $scope.username = "";
    $scope.password = "";
    $scope.email = "";
    // $scope.usernameChange = function () {
    //     console.log('Username: ', $scope.username);
    // }
    // $scope.passwordChange = function () {
    //     console.log('Password: ', $scope.password);
    // }
    $scope.saveUser = function () {
        console.log('A user filled the sign-up form with given data: ');
        var userInfo = {
            'data': {
                'username': $scope.username,
                'email': $scope.email,
                'password': $scope.password
            },
            'type': 'signup'
        }
        chrome.runtime.sendMessage(userInfo, (res) => {
            if (res.status == 200) {
                $state.go('welcome', {
                    "user": userInfo.data.email
                })
            }
            else {
                $state.go('errorAuth');
            }
            console.log(res); // response which we got from the background.js
        });

        console.log(userInfo);
    }
}]);
amazonextension.controller('LoginFormController', ['$scope', '$state', function ($scope, $state) {
    $scope.email = "";
    $scope.password = "";
    // $scope.usernameChange = function () {
    //     console.log('Username: ', $scope.username);
    // }
    // $scope.passwordChange = function () {
    //     console.log('Password: ', $scope.password);
    // }
    $scope.saveUser = function () {
        console.log('A user filled the login form with given data: ');
        var userInfo = {
            'data': {
                'email': $scope.email,
                'password': $scope.password
            },
            'type': 'login'
        }
        chrome.runtime.sendMessage(userInfo, (res) => {
            if (res.status == 200) {
                $state.go('welcome', {
                    "user": userInfo.data.email
                })
            }
            else {
                $state.go('errorAuth');
            }
            console.log(res); // response which we got from the background.js
        });

        console.log(userInfo);
    }
}])
