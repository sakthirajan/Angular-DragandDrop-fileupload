'use strict';
//angular module droganddropapp
var droganddropapp = angular.module("droganddropapp", [
    "ui.router"
]);

//droganddropapp config
droganddropapp.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

   
});

// AppController
droganddropapp.controller('AppController', function ($scope, $rootScope) {

    var dropbox = document.getElementById("dropbox")
    $scope.dropText = 'Select a File (or) Drop and Drop files here...'

    // drog and drop event
    function dragEnterLeave(evt) {
        evt.stopPropagation()
        evt.preventDefault()
    }
    dropbox.addEventListener("dragenter", dragEnterLeave, false)
    dropbox.addEventListener("dragleave", dragEnterLeave, false)
    dropbox.addEventListener("dragover", function (evt) {
        evt.stopPropagation()
        evt.preventDefault()
    }, false)

    $scope.files = [], $scope.displayimage = [];

    dropbox.addEventListener("drop", function (evt) {
        evt.stopPropagation()
        evt.preventDefault()
        var files = evt.dataTransfer.files
        if (files.length > 0) {
            $scope.$apply(function () {
                for (var i = 0; i < files.length; i++) {
                    var imgfiletype = files[i].name;
                    var fileextension = imgfiletype.substr(imgfiletype.length - 3)
                    var Img = fileextension.toLowerCase();
                    if (Img == "jpeg" || Img == "png" || Img == "jpg") {
                        $scope.files.push(files[i]);
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            $scope.$apply(function () {
                                $scope.displayimage.push(e.target.result);
                            })
                        };
                        reader.readAsDataURL(files[0]);
                        $scope.message = false;
                    }
                    else {
                        $scope.message = true;
                        angular.element(fileToUpload).val(null);
                    }
                }

            })
            
        }
    }, false)
   
    // click upload set file
    $scope.setFiles = function (element) {
        $scope.$apply(function ($scope) {
            for (var i = 0; i < element.files.length; i++) {
                var imgfiletype = element.files[i].name;
                var fileextension = imgfiletype.substr(imgfiletype.length - 3)
                var Img = fileextension.toLowerCase();
                if (Img == "jpeg" || Img == "png" || Img == "jpg") {
                    $scope.files.push(element.files[i])
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $scope.$apply(function () {
                            $scope.displayimage.push(e.target.result);
                        })
                    };
                    reader.readAsDataURL(element.files[0]);
                    $scope.message = false;
                }
                else {
                    $scope.message = true;
                    angular.element(fileToUpload).val(null);
                }

            }
          
            
        });
    };
   
});
