"use strict";

angular.module("ngapp").controller("MainController",
    function (shared, $state, $scope, $mdSidenav, $http, $mdComponentRegistry) {
        $scope.user = null;
        $scope.password = null;
        $scope.login = {};
        $scope.register = {};
        $scope.selectedModule = 'main';
        $scope.respData = null;
        $scope.locationTxt = null;
        let server = shared.info.server;
        $scope.user = {
            "name": "John",
            "email": "john.doe@toptal.com",
            "updated_at": "2020-03-21 15:51:54",
            "created_at": "2020-03-21 15:51:54",
            "id": 2,
            "api_token": "ibvmnzk1XE3uBXXfR4Mh9CiDCuVtibPkU8B4dWkV7gWA5s88n2R8GNqLoG7a"
        };

        var ctrl = this;
        this.auth = shared.info.auth;
        this.toggle = angular.noop;
        this.title = $state.current.title;


        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: '# of hours',
                    data: [12, 19, 3, 5, 2, 3, 9],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });




        $scope.cardSelectAction = function (index) {
            $scope.selectedModule = index;
        };

        $scope.initLocation = function () {

        };

        $scope.submitLogin = function () {
            localStorage.setItem("user_data", JSON.stringify($scope.user));
            localStorage.setItem("user_token", $scope.user.api_token);
            $scope.selectedModule = 'logged';

        };

        $scope.selectAction = function (index) {
            if (localStorage.getItem('user_token') == null) {
                if (index != 'main') {
                    $scope.selectedModule = "login";
                }
            } else {
                $scope.selectedModule = index;
            }


            $mdSidenav("left").toggle()
                .then(function () {
                });
        };

        $scope.shareResult = function(){

        };

        $scope.initLocation = function () {

            $http({
                url: "https://covid19-germany.appspot.com/now", method: 'POST',
                headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
            }).success(function (response) {
                console.log(response)
            }).error(function(err){
                console.log(err);
            });


            let onSuccess = function (position) {
                let currentPosition = {
                    'Latitude: ': position.coords.latitude,
                    'Longitude: ': position.coords.longitude,
                    'Accuracy: ': position.coords.accuracy,
                    'Altitude Accuracy: ': position.coords.altitudeAccuracy,
                    'Heading: ': position.coords.heading,
                    'Speed: ': position.coords.speed,
                    'Timestamp: ': position.timestamp,
                };

                localStorage.setItem("user_location", JSON.stringify(currentPosition));
            };

            function onError(error) {
                alert('code: ' + error.code + '\n' +
                    'message: ' + error.message + '\n');
            }

            var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: false});
            navigator.geolocation.clearWatch(watchID);
            console.log('location', watchID);
        };


        this.isOpen = function () {
            return false
        };
        $mdComponentRegistry
            .when("left")
            .then(function (sideNav) {
                ctrl.isOpen = angular.bind(sideNav, sideNav.isOpen);
                ctrl.toggle = angular.bind(sideNav, sideNav.toggle);
            });

        this.toggleRight = function () {
            $mdSidenav("left").toggle()
                .then(function () {
                });
        };

        this.close = function () {
            $mdSidenav("right").close()
                .then(function () {
                });
        };

        $scope.initLocation();
    });





