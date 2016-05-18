'use strict';
angular.module('todoApp', ['ngRoute','AdalAngular'])
.config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', function ($routeProvider, $httpProvider, adalProvider) {

    $routeProvider.when("/Home", {
        controller: "homeCtrl",
        templateUrl: "/App/Views/Home.html",
    }).when("/TodoList", {
        controller: "todoListCtrl",
        templateUrl: "/App/Views/TodoList.html",
        requireADLogin: true,
    }).when("/ToGoList", {
        controller: "toGoListCtrl",
        templateUrl: "/App/Views/ToGoList.html",
        requireADLogin: true,
    }).when("/UserData", {
        controller: "userDataCtrl",
        templateUrl: "/App/Views/UserData.html",
    }).otherwise({ redirectTo: "/Home" });

    var endpoints = {

        // Map the location of a request to an API to a the identifier of the associated resource
        "https://localhost:44327/": "https://bgtest14.onmicrosoft.com/ToGoAPI",
    };

    adalProvider.init(
        {
            instance: 'https://login.microsoftonline.com/',
            tenant: 'bgtest14.onmicrosoft.com',
            clientId: '2ba9511b-0c64-4689-b5c0-6bdc3f0dc5ad',
            extraQueryParameter: 'nux=1',
            endpoints: endpoints,
            //cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.  
            // Also, token acquisition for the To Go API will fail in IE when running on localhost, due to IE security restrictions.
        },
        $httpProvider
        );
   
}]);
