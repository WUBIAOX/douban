var top250Module =angular.module('top250Module',[]);
top250Module.controller('top250Controller',function ($scope,$http,HttpService) {
    $scope.loading = true;
    $scope.datas = [];
    $scope.pages =0;
    $scope.curpage =1;

    $scope.getData  = function ( start,count) {
        HttpService.jsonp(
            'https://api.douban.com/v2/movie/top250', {
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
            $scope.getData(($scope.curpage-1)*10,10);

        }

    }

    $scope.prePage = function () {
        if($scope.curpage==1){
            return
        }else {
            $scope.curpage-=1;
            $scope.getData(($scope.curpage-1)*10,10);

        }

    }

    $scope.getData(($scope.curpage-1),10);
});
