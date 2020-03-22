"use strict";

angular.module("ngapp").controller("MainController",
    function (shared, $state, $scope, $mdSidenav, $http, $mdComponentRegistry) {
        $scope.user = null;
        $scope.password = null;
        $scope.login = {};
        $scope.register = {};
        $scope.selectedModule = 'main';
        $scope.respData = null;
        let server = shared.info.server;
        $scope.user = {
            "data": {
                "name": "John",
                "email": "john.doe@toptal.com",
                "updated_at": "2020-03-21 15:51:54",
                "created_at": "2020-03-21 15:51:54",
                "id": 2,
                "api_token": "ibvmnzk1XE3uBXXfR4Mh9CiDCuVtibPkU8B4dWkV7gWA5s88n2R8GNqLoG7a"
            }
        };

        var ctrl = this;
        this.auth = shared.info.auth;
        this.toggle = angular.noop;
        this.title = $state.current.title;


        $scope.cardSelectAction = function (index) {
            $scope.selectedModule = index;
        };

        $scope.submitLogin = function () {
            $http.post(server + 'login', {
                data: $scope.login
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }}).success(function (response) {
                $scope.respData = response.data;
            });
            // localStorage.setItem("user_data", JSON.stringify($scope.user));
            // $scope.selectedModule = 'logged';

        };

        $scope.selectAction = function (index) {
            $scope.selectedModule = index;
            $mdSidenav("left").toggle()
                .then(function () {
                });
        };

        // this.initLocation = function(){
        //     document.getElementById("getPosition").addEventListener("click", getPosition);
        //     document.getElementById("watchPosition").addEventListener("click", watchPosition);
        //
        //     function getPosition() {
        //         var options = {
        //             enableHighAccuracy: true,
        //             maximumAge: 3600000
        //         }
        //         var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
        //
        //         function onSuccess(position) {
        //             // alert('Latitude: '          + position.coords.latitude          + '\n' +
        //             //     'Longitude: '         + position.coords.longitude         + '\n' +
        //             //     'Altitude: '          + position.coords.altitude          + '\n' +
        //             //     'Accuracy: '          + position.coords.accuracy          + '\n' +
        //             //     'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        //             //     'Heading: '           + position.coords.heading           + '\n' +
        //             //     'Speed: '             + position.coords.speed             + '\n' +
        //             //     'Timestamp: '         + position.timestamp                + '\n');
        //         }
        //
        //         function onError(error) {
        //             alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        //         }
        //     }
        //
        //     function watchPosition() {
        //         var options = {
        //             maximumAge: 3600000,
        //             timeout: 3000,
        //             enableHighAccuracy: true,
        //         };
        //         var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
        //
        //         function onSuccess(position) {
        //             // alert('Latitude: '          + position.coords.latitude          + '\n' +
        //             //     'Longitude: '         + position.coords.longitude         + '\n' +
        //             //     'Altitude: '          + position.coords.altitude          + '\n' +
        //             //     'Accuracy: '          + position.coords.accuracy          + '\n' +
        //             //     'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        //             //     'Heading: '           + position.coords.heading           + '\n' +
        //             //     'Speed: '             + position.coords.speed             + '\n' +
        //             //     'Timestamp: '         + position.timestamp                + '\n');
        //         }
        //
        //         function onError(error) {
        //             // alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
        //         }
        //     }
        // };


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

        // this.initLocation();
    });





