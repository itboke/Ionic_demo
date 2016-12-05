// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var key = 'e29d11c9768f44e673186004169a0982';
angular.module('starter', ['ionic'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        $ionicConfigProvider.platform.android.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');

        $stateProvider
            .state('/', {
                url: '/',
                views: {
                    'home': {
                        templateUrl: "./tpl/home.html"
                    }
                }
            })
            .state('/category', {
                url: '/category',
                views: {
                    'category': {
                        templateUrl: "./tpl/category.html"
                    }
                }
            })
            .state('/list', {
                url: '/list?id',
                views: {
                    'category': {
                        templateUrl: './tpl/list.html',
                        controller: 'listPanel'
                    }
                }
            })
            .state('/about', {
                url: '/about',
                views: {
                    'about': {
                        templateUrl: function() {
                            var user = sessionStorage.getItem('user');
                            if (!user) {
                                return "./tpl/login.html";
                            }
                            return './tpl/about.html';
                        }
                    }
                }
            })

        $urlRouterProvider.otherwise('/');
    })
    .controller('indexPage', ['$scope', '$ionicPopup', '$timeout', '$http', '$ionicPopover','$ionicLoading', function($scope, $ionicPopup, $timeout, $http, $ionicPopover,$ionicLoading) {

        $scope.popover = $ionicPopover.fromTemplateUrl('./tpl/step.html', {
            scope: $scope
        });

        $ionicPopover.fromTemplateUrl('./tpl/step.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });
        //查看菜谱的步骤
        $scope.showStep = function(item) {
            $scope.steps = item.steps;
            $scope.popover.show();
        };
        $scope.getCook = function(name) {
            var api = 'http://apis.juhe.cn/cook/query.php?key=' + key + '&menu=' + name + '&rn=10';
            $http.get(api).success(function(res) {
                $scope.list = res.result.data;
            })
        };
        $scope.getCook('白萝卜');
        //登录
        $scope.userInfo = {
            username: "",
            password: ""
        };
        //菜名
        $scope.menu = {
            name: ""
        };
        //模拟文章目录
        $scope.cates = [{
            id: 1,
            name: '佛学禅语',
            color: 'balanced-bg'
        }, {
            id: 2,
            name: '生存技能',
            color: 'energized-bg'
        }, {
            id: 3,
            name: '生命禅音',
            color: 'stable-bg'
        }];
        //搜索菜谱弹层
        $scope.getMenu = function() {
            $ionicPopup.show({
                template: '<input type="text" ng-model="menu.name" class="text-center">',
                title: '请想下厨的您输入菜名',
                subTitle: '蔬菜名、肉名...',
                scope: $scope,
                buttons: [
                    { text: '取消' }, {
                        text: '<b>搜索</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.menu.name) {
                                e.preventDefault();
                            } else {
                                $scope.loading(function(){
                                    $timeout(function () {
                                        $ionicLoading.hide();
                                    }, 2000);
                                });
                                $scope.getCook($scope.menu.name);
                            }
                        }
                    }
                ]
            });
        };
        $scope.loading = function(fn){
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            fn();
        };
        //下拉刷新
        $scope.doRefresh = function() {
            $scope.$broadcast('scroll.refreshComplete');
        };
        //alert提醒
        $scope.showAlert = function(template) {
            var alertPopup = $ionicPopup.alert({
                title: '温馨提示',
                template: template
            });
        };
        //登录
        $scope.login = function() {
            var u = $scope.userInfo.username;
            var p = $scope.userInfo.password;
            if (!u) {
                $scope.showAlert('请填写用户名!');
                return;
            }
            if (!p) {
                $scope.showAlert('请填写用户密码!');
                return;
            }
            if (u === 'admin' && p === '123456') {
                sessionStorage.setItem('user', 'admin');
                $scope.showAlert('恭喜您,登录成功!');
                $timeout(function() {
                    window.location.reload();
                }, 2000)
            } else {
                $scope.showAlert('请填写正确的用户名或密码!');
            }
        }
    }])
    .controller('listPanel',['$scope','$stateParams','$http','$log',function($scope,$stateParams,$http,$log){
        if($stateParams.id == '3'){

        }
    }])
