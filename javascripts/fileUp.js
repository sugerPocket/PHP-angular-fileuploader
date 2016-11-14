(function () {
    'use strict';

    angular
        .module('fileApp', ['angularFileUpload'])
        .controller('faController', ['$scope', 'FileUploader', '$http', function ($scope, FileUploader, $http) {
            var uploader = $scope.uploader = new FileUploader({
                url: 'PHP/upload.php',
                removeAfterUpload: true
            });

            var message = $scope.message = {
                instance: "",
                isShow: false,
                disabled: false,
                hide: function () {
                    this.isShow = false;
                }
            }

            //定义filter

            uploader.filters.push({
                name: 'outOfSize',
                fn: function (item, options) {
                    return item.size / 1024 / 1024 < 15;
                }
            });

            uploader.filters.push({
                name: 'isFull',
                fn: function (item, options) {
                    return this.queue.length <= 1;
                }
            });

            uploader.filters.push({
                name: 'fileName',
                fn: function (item, options) {
                    var name = item.name;
                    var reg_15 = /^15331[0-9]{3}_([\u4e00-\u9fa5]){2,3}\.zip$/;
                    var reg_14 = /^14[0-9]{6}_([\u4e00-\u9fa5]){2,3}\.zip$/;
                    return reg_15.test(name) || reg_14.test(name);
                }
            });


            uploader.onAfterAddingFile = function (fileItem) {
                if (this.queue.length > 1) this.queue.shift();
            };

            uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                message.disabled = false;
                message.instance = "请按要求选择文件";
                message.isShow = true;
            };

            uploader.onErrorItem = function (fileItem, response, status, headers) {
                message.disabled = false;
                message.instance = response;
                message.isShow = true;
            };

            uploader.onProgressAll = function (progress) {
                message.disabled = true;
                message.instance = "正在上传";
                message.isShow = true;
            };

            uploader.onSuccessItem = function (fileItem, response, status, headers) {
                if (response.success) message.instance = "Success!";
                else message.instance = "未知原因，上传失败！";
                
                message.disabled = false;
                message.isShow = true;
            };
        }]);
})();