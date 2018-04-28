$(document).ready(function() {

  AOS.init();

  var anchors = $("[data-name = anchor]");
	var scrollArr = [$(".c-receipts"), $(".c-units")];
	var menu = $(".c-header__menu li");
	var charts = [
		{block: $("[data-chart='1'] li"), flag: true},
		{block: $("[data-chart='2'] li"), flag: true},
		{block: $("[data-chart='3'] li"), flag: true},
		{block: $("[data-chart='4'] li"), flag: true},
    {block: $("[data-chart='5'] li"), flag: true},
		{block: $("[data-chart='6'] li"), flag: true}
	];

  menu.click(function () {
    $("body").removeClass("no-scroll");
    var index = $(this).index();
    $(".c-header__logo").removeClass("invisible");
    $('html, body').animate({
        scrollTop: scrollArr[index].offset().top
    }, 1000);
    if($(window).width() < 763) {
      $(".c-header__logo_white").toggle();
      $('.c-header__menu').fadeOut();
      $(".c-header__menu_button").removeClass('close');
    };
  });

  $(".c-header__menu_button").on("click", function() {
    var $menu = $(this).next('.c-header__menu');
    $(".c-header__logo_white").toggle();
    $(".c-header__logo").toggleClass("invisible");
    if ($menu.is(':hidden')) {
  		$("body").addClass("no-scroll");
  		$menu.fadeIn();
  		$(this).addClass('close');
  	} else {
  		$("body").removeClass("no-scroll");
  		$menu.fadeOut();
  		$(this).removeClass('close');
  	}
  });

  // function openVideo (e) {

  //   var video = document.createElement('video');
  //   var container = document.getElementById('videoModalPlayer')
  //   function addSourceToVideo(element, src, type) {
  //     var source = document.createElement('source');


  //     source.src = src;
  //     source.type = type;

  //     element.appendChild(source);
  //   }
  //   addSourceToVideo(video, 'http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv', 'video/ogg');  
  //   container.appendChild(video);
  // }

  // function closeVideo (e) {
  //   var video = $(".c-modal__player video")[0];
  //   $(video).html("")
  // }
  // $("#videoModal").on('beforeOpen', openVideo)
  // $("#videoModal").on('afterClose', closeVideo)

  $("#openVideo").on("click", function() {
    $("#videoModal").arcticmodal(
    { 
      beforeOpen: function() { 
        // $(".c-modal__frame").attr("src", "../images/report/reportVideo.html")
        $(".c-modal__frame").attr("src", "https://www.youtube.com/embed/Wdt6Ayio48o/?autoplay=1") 
      }, 
      afterClose: function() { 
        $(".c-modal__frame").attr("src", "") 
      }
    }
    );
  });

	$(".c-button_up").on("click", function() {
		$('html, body').animate({
        scrollTop: $('html, body').offset().top
    }, 1000);
	});

	$("[data-chart] li div").hide();

  function animate(data) { 
		$(data).hide();
		$(data).animate({
	   	height: "toggle"
	   }, 1000);
	};

  function count(data) {
  	data.fadeIn(10);
    data.prop('Counter',0).animate({
        Counter: data.text()
    }, {
        duration: 1000,
        easing: 'swing',
        step: function (now) {
            data.text("+" + now.toFixed(1) + "%");
        }
    });
	}
	$(".c-chart__shift").hide();

  if($(window).width() > 960) {
    $(".c-units .c-tile .c-title").hide(); 
    $(".c-units .c-tile .c-text").hide(); 
  }

  window.addEventListener("scroll", function() {
    AOS.refresh();
  	if($("div[data-name = 'anchor']").offset().top - $(window).scrollTop() < 200) {
  		$(".c-button_up").fadeIn(100);
  	} else {
  		$(".c-button_up").fadeOut(100);
  	};
  	charts.forEach(function(item) {
  		var offsetTop = item.block.offset().top - $(window).scrollTop();
  			if(offsetTop <= 600 && item.flag) {
  				animate(item.block.find("div"));
  				count(item.block.find(".c-chart__shift"));
  				item.flag = false;
  		  };
        if(offsetTop <= 1000 && $(window).width() > 960) {
          item.block.closest($(".c-tile")).find($(".c-title")).fadeIn(1000);
          item.block.closest($(".c-tile")).find($(".c-text")).fadeIn(1000);
        };
  	});
  });
  $("#openVideo").on("click", function(){
    $("#videoModal").arcticmodal();
	});

});
