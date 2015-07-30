$(document).ready(function(){
	$('.acc_container').hide(); //Hide/close all containers
	$('.acc_trigger:first').addClass('active').next().show(); //Add "active" class to first trigger, then show/open the immediate next container
	
	$('.acc_trigger').click(function(){
		if( $(this).next().is(':hidden') ) { //If immediate next container is closed...
			$('.acc_trigger').removeClass('active').next().slideUp(); //Remove all .acc_trigger classes and slide up the immediate next container
			$(this).toggleClass('active').next().slideDown(); //Add .acc_trigger class to clicked trigger and slide down the immediate next container
			$(this).siblings(".acc_container").find(".myList li:first").addClass("choose");
		}
		return false; //Prevent the browser jump to the link anchor
	});
	$(".myList li").addClass("default");
	$(".myList a").bind("click" , function () {
		$(".myList a").each(function (i) {
			$(this).parent().removeClass("choose" );
		})
		$(this).parent().addClass("choose" );
	});

    //²Ëµ¥×óÓÒ°ó¶¨
	var $hidden = $("#menu_page").text().trim();
	var $allLi = $(".lm_menu h2").siblings(".acc_container").find("li");
	$allLi.each(function (i, n) {
	    if ($(n).attr("title") == $hidden) {
	        $(".acc_trigger").next().hide();
	        $(n).parents(".acc_container").show().siblings(".acc_trigger").removeClass("active");
	        $(n).parents(".acc_container").prev(".acc_trigger").addClass("active");
	        $(n).addClass("choose");
	    }
	});

});