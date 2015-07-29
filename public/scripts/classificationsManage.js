var myModule = angular.module('ClassificationsManage', ['ui.bootstrap']);
myModule
    .controller("classificationsManageCtl", function ($scope, $http, $modal) {
        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.pageSize = 5;
        $scope.PresModel = {};
        $scope.chooseList = []; //当前页面选择的数据
        $scope.searchVal = '';
        $scope.resourceType = 2;

        //页面第一次打开时候的数据加载
        var getRouces = function (page) {
            $http.post("/Admin/GetAllClassifications", { title: $scope.searchVal, isAwake: $scope.resourceType, pageIndex: page, pageCount: 5 }).success(function (data) {
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
            if(type=="1"){
                var modalModify = $modal.open({
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalModifyCtrl',
                    resolve: {
                        PResouce: function () {
                            return PResouce;
                        }
                    }
                });

                modalModify.result.then(function (selectedItem) {
                    $scope.PresModel = selectedItem;
                });
            }
            if (type == "2") {
                $http.post("/Admin/AwakeClassification", { ClassificationId: PResouce.Id }).success(function (data) {
                    alert("修改成功！");
                    getRouces(1);
                });
            }
        }

        ////删除当前页面里的已选择的数据-批处理
        $scope.BatchPResDel = function () {
            var seri = $scope.chooseList.toString();
            if ($scope.chooseList.length > 0 && confirm("确定要删除？")) {
                $http.post("/Admin/DeleteClassification", { ids: seri }).success(function (data) {
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
      //创建和修改标签
    .controller("ModalModifyCtrl", function ($scope, $http, $modalInstance, PResouce) {
        $scope.PRes = PResouce;
        $scope.PresModify = function () {
            $http.post("/Admin/PostClassification", { model: $scope.PRes }).success(function (data) {
                if (!data.Success) {
                    alert("操作失败");
                } else {
                    alert(data.Message);
                }
                $modalInstance.close('修改');
            });
        }
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    })

    //创建标签
    .controller("CreateClassification", function ($scope, $http) {
        $scope.PResouce = {
            Id: null,
            ClassificationName: '',
        };
        $scope.TagSubmit = function () {
            $http.post("/Admin/PostClassification", { model: $scope.PResouce }).success(function (data) {
                if (!data.Success) {
                    alert("创建失败！");
                } else {
                    alert("创建成功！");
                    $scope.PResouce.TagName = '';
                    window.location.href = "/Admin/ClassificationsManage"

                }
            });
        }
    })