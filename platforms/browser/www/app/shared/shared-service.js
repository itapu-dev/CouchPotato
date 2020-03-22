"use strict";

angular.module("ngapp").service("shared", function(){ // One of The Ways To Share Informations Across the Controllers

    this.info = {
        title: "",
        auth: "",
        server: "http://ppp.test-ssc.eu/api/v1/"
    };
});
