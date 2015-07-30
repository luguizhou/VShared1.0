var myModule = angular.module('TechArticleManage', ['ui.bootstrap']);
myModule
    .controller("TechArticleManageCtl", function ($scope, $http, $modal) {
        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.pageSize = 5;
        $scope.PresModel = {};
        $scope.chooseList = []; //当前页面选择的数据
        $scope.searchVal = '';
        $scope.resourceType = 2;

        //页面第一次打开时候的数据加载
        var getRouces = function (page) {
            $http.post("/TechArticle/GetAllArticles", { title: $scope.searchVal, pageIndex: page, pageCount: 5 }).success(function (data) {
                $scope.tagsList = data.Data.Records;
                $scope.totalItems = data.Data.Pager.TotalRecordCount;
                $scope.currentPage = page;
                $scope.chooseList = [];
                $scope.chooseAll = false;
            });
        }

        $scope.getPresouces = function (page) {
            getRouces(page);
        };

        $scope.getPresouces(1);

        //搜索按钮点击事件
        $scope.SearchBtn = function () {
            getRouces(1);
        }

        //资源类型点击事件
        $scope.ResourceTypeBtn = function () {
            getRouces(1);
        }

        ////修改资源信息
        $scope.PResModify = function (PResouce, type) {
            window.location.href = "/Admin/createTechArticle?guid=" + PResouce.Id;
        }

        ////删除当前页面里的已选择的数据-批处理
        $scope.BatchPResDel = function () {
            var seri = $scope.chooseList.toString();
            if ($scope.chooseList.length > 0 && confirm("确定要删除？")) {
                $http.post("/TechArticle/Delete", { ids: seri }).success(function (data) {
                    if (!data.Success) {
                        alert("删除失败！");
                    } else {
                        alert("删除成功！");
                        getRouces(1);
                    }
                });
            }
        };

        //选择当页面的的一条数据
        $scope.ChoosePResouces = function (presouce) {
            var tag = 0;
            for (var i = 0; i < $scope.chooseList.length; i++) {
                if ($scope.chooseList[i] == presouce.Id) {
                    tag = 1
                    $scope.chooseList.splice(i, 1);
                }
            }
            if (tag != 1) {
                $scope.chooseList.push(presouce.Id);
            }
        };

        //全选当页面的数据
        $scope.ChooseAllPResouces = function () {
            if (!$scope.chooseAll) {
                $scope.chooseList = [];
                for (var i = 0; i < $scope.PResouces.length; i++) {
                    $scope.chooseList.push($scope.PResouces[i].Id)
                }
            } else {
                $scope.chooseList = [];
            }
        };
    })
    //创建技术晨读
    .controller("CreateTechArticle", function ($scope, $http) {

        $scope.PResouce = {
        };
        $scope.PResouce.Id = $("#TechArticleId").val();
        $scope.$watch("TechArticleId", function () {
            $http.post("/TechArticle/GetArticle", { id: $scope.PResouce.Id }).success(function (data) {
                $scope.PResouce = data.Data;
                KindEditor.html('textarea[name="Content"]', data.Data.Content);
            });
        });

        $scope.TechArticleSubmit = function () {
            if ($scope.PResouce.Id.length > 0) {
                $scope.PResouce.Content = neweditor.html();
                $http.post("/TechArticle/Modify", { model: $scope.PResouce }).success(function (data) {
                    if (!data.Success) {
                        alert("修改失败！");
                    } else {
                        alert("修改成功！");
                        $scope.PResouce.title = '';
                        KindEditor.html('textarea[name="Content"]', '');
                        window.location.href = "/Admin/TechArticleManage"
                    }
                });
            } else {
                $scope.PResouce.Content = neweditor.html();
                $http.post("/TechArticle/Add", { model: $scope.PResouce }).success(function (data) {
                    if (!data.Success) {
                        alert("创建失败！");
                    } else {
                        alert("创建成功！");
                        $scope.PResouce.TagName = '';
                        KindEditor.html('textarea[name="Content"]', '');
                        window.location.href = "/Admin/TechArticleManage"
                    }
                });
            }
            
        }
    })

//富文本编辑器


var neweditor;
window.onload = function () {
    neweditor = KindEditor.create('textarea[name="Content"]', {
        resizeType: 1
    });
};
function fwb() {
    document.getElementById("show").innerHTML = neweditor.html();
}
//KindEditor.html('#txtIntroduce', data.Introduce);
//<link href="kindeditor/themes/default/default.css" rel="stylesheet" type="text/css" />
//<link href="kindeditor/plugins/code/prettify.css" rel="stylesheet" type="text/css" />
// <script type='text/javascript' src='kindeditor/kindeditor.js'></script>  
// <script type='text/javascript' src='kindeditor/plugins/code/prettify.js'></script>