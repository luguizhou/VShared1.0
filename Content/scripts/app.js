$(document).ready(function() {
    //
    $(".back-to-top").hide();
    $(function() {
        $(window).scroll(function() {
            if ($(window).scrollTop() > 100) {
                $(".back-to-top").fadeIn(300);
            } else {
                $(".back-to-top").fadeOut(500);
            }
        });
        $(".back-to-top").click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 1000);
            return false;
        });
    });
    //
    $(".mc_nav a").bind("click", function() {
        $(".mc_nav a").each(function(i) {
            $(this).parent().removeClass("nav_active");
        })
        $(this).parent().addClass("nav_active");
    });
    //
    var $hidden = $("#nav_hidden").val();
    var $allLi = $(".mc_nav").find("li");
    $allLi.each(function(i, n) {
        if ($(n).attr("title") == $hidden) {
            $allLi.removeClass("nav_active");
            $(n).addClass("nav_active");
        }
    });
});

angular.module('myModule', ['ui.router', 'ui.bootstrap']).
config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('Home', {
                url: '/home',
                controller: 'HomeCtrl',
                templateUrl: 'views/home.html'
            })
            .state('Header', {
                url: '/header',
                controller: 'HeaderCtrl',
                templateUrl: 'views/header.html'
            })
            .state('Footer', {
                url: '/footer',
                controller: 'FooterCtrl',
                templateUrl: 'views/footer.html'
            });
        $urlRouterProvider.when('/', '/home');
    })
    .controller('HomeCtrl', function($scope) {
        $scope.myInterval = 5000;
        var slides = $scope.slides = [];
        $scope.addSlide = function() {
            var newWidth = 600 + slides.length;
            slides.push({
                image: 'http://placekitten.com/' + newWidth + '/250',
                // image: '' + newWidth + '/300',
                text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' + ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
            });
        };
        for (var i = 0; i < 5; i++) {
            $scope.addSlide();
        }
    })
    .controller('Page1Ctrl', function($scope) {
        $scope.testValue = 'page1,page1Ctrl';
    })
    .controller('Page2Ctrl', function($scope) {
        $scope.testValue = 'page2,page2Ctrl';
    });
