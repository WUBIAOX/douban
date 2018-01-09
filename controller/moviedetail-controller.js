var moviedetailModule =angular.module('moviedetailModule',[]);
moviedetailModule.controller('moviedetailController',function ($scope,HttpService) {

    $scope.datas =[];


    var url =window.location.hash;

       var id =  url.substring(url.lastIndexOf('?')).split('=')[1];
    $scope.idUrl='https://movie.douban.com/subject/'+id;


    $scope.getMovieDetail = function (id) {
        HttpService.jsonp(
            'https://api.douban.com/v2/movie/'+id+'', {

            },
            function(data) {
                console.log(data);
                $scope.datas = data;



                $scope.$apply();
                // $apply的作用就是让指定的表达式重新同步

            });

    }

    $scope.getMovieDetail(id);


});