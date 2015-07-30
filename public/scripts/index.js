$(document).ready(function(){
    //返回顶部
    $(".back-to-top").hide();
	$(function () {
		$(window).scroll(function(){
			if ($(window).scrollTop()>100){
				$(".back-to-top").fadeIn(300);
			}
			else
			{
				$(".back-to-top").fadeOut(500);
			}
		});
		$(".back-to-top").click(function(){
			$('body,html').animate({scrollTop:0},1000);
			return false;
		});
	});
    //选中切换
	$(".mc_nav a").bind("click", function () {
	    $(".mc_nav a").each(function (i) {
	        $(this).parent().removeClass("nav_active");
	    })
	    $(this).parent().addClass("nav_active");
	});
    //保持当前选中状态
	var $hidden = $("#nav_hidden").val();
	var $allLi = $(".mc_nav").find("li");
	$allLi.each(function (i, n) {
	    if ($(n).attr("title") == $hidden) {
	        $allLi.removeClass("nav_active");
	        $(n).addClass("nav_active");
	    }
	});
});

//首页内容区
var homeApp = angular.module('homeApp', ['ui.bootstrap']).
    controller('homeCtrl', function ($scope) {
        $scope.myInterval = 5000;
        var slides = $scope.slides = [];
        $scope.addSlide = function () {
            var newWidth = 600 + slides.length;
            slides.push({
                image: 'http://placekitten.com/' + newWidth + '/250',
               // image: '' + newWidth + '/300',
                text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' +
                  ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
            });
        };
        for (var i = 0; i < 5; i++) {
            $scope.addSlide();
        }
});