var myModule = angular.module('iTechArticle', ['ui.bootstrap']);
myModule.controller('iTechArticleCtrl', function ($scope,$http) {
    $scope.getLeftList={};
    $scope.getLeftList = function () {
        $http.post('/TechArticle/GetAllArticles', { title: '', pageindex: 1, pageCount: 5 }).
            success(function (data) {
                $scope.getLeftList = data;
            });
    }
    $scope.getLeftList();
    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.showWeeks = true;
    $scope.toggleWeeks = function () {
        $scope.showWeeks = !$scope.showWeeks;
    };

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.toggleMin = function () {
        $scope.minDate = ($scope.minDate) ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
    $scope.format = $scope.formats[1];
})


//富文本编辑器


//var neweditor;
//window.onload = function () {
//    neweditor = KindEditor.create('textarea[name="Content"]', {
//        resizeType: 1
//    });
//};
//function fwb() {
//    document.getElementById("show").innerHTML = neweditor.html();
//}
	 
	 //<link href="kindeditor/themes/default/default.css" rel="stylesheet" type="text/css" />
	 //<link href="kindeditor/plugins/code/prettify.css" rel="stylesheet" type="text/css" />
	 // <script type='text/javascript' src='kindeditor/kindeditor.js'></script>  
	 // <script type='text/javascript' src='kindeditor/plugins/code/prettify.js'></script>