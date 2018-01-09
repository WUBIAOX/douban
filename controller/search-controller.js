var searchModule =angular.module('searchModule',[]);
searchModule.controller('searchController',function ($scope, $http,$routeParams, HttpService) {
        var search =$routeParams.search;


    $scope.loading = true;
    $scope.datas = [];
    $scope.pages =0;
    $scope.curpage =1;
    $scope.search = search;
    $scope.inputpage=' ';


    $scope.getData  = function (search, start,count) {
        HttpService.jsonp(
            'http://api.douban.com/v2/movie/search', {
                'q':search,
                'start':start,
                'count':count
            },
            function(data) {
                console.log(data);
                $scope.datas = data;


                $scope.pages =  Math.ceil(parseInt(data.total)/parseInt(data.count));
                $scope.loading = false;

                $scope.$apply();

                console.log($scope.loading);
                // $apply的作用就是让指定的表达式重新同步
            });


    }

    $scope.nextPage = function () {
        if($scope.curpage==$scope.pages){
            return
        }else {
            $scope.curpage+=1;
            $scope.getData(search,($scope.curpage-1)*10,10);

        }

    }

    $scope.prePage = function () {
        if($scope.curpage==1){
            return
        }else {
            $scope.curpage-=1;
            $scope.getData(search,($scope.curpage-1)*10,10);

        }

    }

    $scope.getData(search,($scope.curpage-1)*10,10);



    $scope.getDatajumppage = function () {



            $scope.curpage=parseInt($scope.inputpage);
            $scope.getData(search,(parseInt($scope.inputpage)-1)*10,10);

    }



});