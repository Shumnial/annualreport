$(document).ready(function() {
	AOS.init();
	var seq = 0,
	delays = 10,
	durations = 300;
	var scrollArr = [
										$(".c-report"), 
										$(".c-factors"), 
										$(".c-step"), 
										$(".c-indicators"),
										$(".c-conclusion")
									];
	var nav = $(".c-header__nav li");
  	nav.click(function (){
  		var index = $(this).index();
      $('html, body').animate({
          scrollTop: scrollArr[index].offset().top
      }, 1000);
  });
	$(".c-header__navButton").on("click", function() {
		var $menu = $(this).next('.c-header__nav');
		if ($menu.is(':hidden')) {
			$menu.fadeIn();
			$(this).addClass('close');
		} else {
			$menu.fadeOut();
			$(this).removeClass('close');
		}
	});

	$(".c-top__text--button").click(function (){
	  		   $('html, body').animate({
	          scrollTop: $(".c-report").offset().top
	      }, 1000);
	});
	for(var i = 50; i > 0; i--) {
		var element = "<li><div class='c-bar c-ratingChart__bar" + i + "'></div></li>"
		$(".c-ratingChart").append(element);
	};
	var height = 100;
	$(".c-ratingChart").find('li').each(function(){
		$(this).find('.c-bar').css('height', height + '%');
		height -= 2;
	});
	$(".c-ratingChart__bar24").append("<span class='c-place26'>26</span>");
	$(".c-ratingChart__bar50").append("<span>1</span>");

	$(".c-rating__info--text").hide();
	$(".chart-info").hide();
	$("#step-chart span").hide();
	$(".c-factors__footnote").hide();


	$(".c-indicatorsChart .c-bar").hide();
	function animateWidth(data) { 
		$(data).hide();
		$(data).animate({
	      	width: "toggle"
	    }, 1000);
	};
	function animateHeight(data) { 
		$(data).hide();
		$(data).animate({
	      	height: "toggle"
	    }, 1000);
	};

	function animate(data) {
	  if(data.type === 'slice' && data.index == 0) {
	    var pathLength = data.element._node.getTotalLength();
	    data.element.attr({
	      'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
	    });
	    var animationDefinition = {
	      'stroke-dashoffset': {
	        id: 'anim' + data.index,
	        dur: 1000,
	        from: -pathLength + 'px',
	        to:  '0px',
	        easing: Chartist.Svg.Easing.easeOutQuint,
	        fill: 'freeze'
	      }
	    };
	    if(data.index !== 0) {
	      animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
	    }
	    data.element.attr({
	      'stroke-dashoffset': -pathLength + 'px'
	    });
	    data.element.animate(animationDefinition, true);
	  }
	};
	function animateStep(data) {
	  if(data.type === 'slice') {
	    var pathLength = data.element._node.getTotalLength();
	    data.element.attr({
	      'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
	    });
	    var animationDefinition = {
	      'stroke-dashoffset': {
	        id: 'anim' + data.index,
	        dur: 1400,
	        from: -pathLength + 'px',
	        to:  '0px',
	        easing: Chartist.Svg.Easing.easeOutQuint,
	        fill: 'freeze'
	      }
	    };
	    if(data.index == 3) {
	      animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
	    }
	    data.element.attr({
	      'stroke-dashoffset': -pathLength + 'px'
	    });
	    data.element.animate(animationDefinition, false);
	  }
	};

	function ratingAnimate(data) {
		$(".c-rating__info--text").slideDown(1000);
		animateHeight(data);
	}
	function ratingLineAnimate(data) {
		animateHeight(data);
	}
	function indicatorsAnimate(data) {
		animateWidth(data);
	}			
	function indicatorsLineAnimate(data) {
		animateHeight(data);
	}
	function popchartAnimate() {
		var populationChart = new Chartist.Pie('#population-chart', {
		  series: [78, 22],
		  label: ['','']
		}, {
		  donut: true,
		  donutWidth: 50,
		  total: 100,
		  showLabel: false, 
		  axisX: {
		  	offset: 0,
		  },
		  axisY: {
		  	offset: 0,
		  },
		});
		populationChart.on('draw', function(data) {
			if(data.type === 'slice' && data.index == 1) {
			  data.element.attr({
			    style: 'stroke: #d7d9da'
			  });
			} else {
				data.element.attr({
				  style: 'stroke: #00a3e6'
				});
			};
		});
		function msieversion() {
		  var ua = window.navigator.userAgent;
		  var msie = ua.indexOf("MSIE ");
		    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || (/Edge\/\d./i.test(navigator.userAgent))) {
		    	return;
		    } else {
		      populationChart.on('draw', animate);
		    }
		   return false;
		}
		msieversion();
		$("#population-chart .chart-info").fadeIn(2000);
		$(".c-factors__footnote").fadeIn(2000);
	};
	function gdpChartAnimate() {
		var gdpChart = new Chartist.Pie('#gdp-chart', {
		  series: [90, 10],
		  label: ['','']
		}, {
		  donut: true,
		  donutWidth: 50,
		  total: 100,
		  showLabel: false,
		  axisX: {
		  	offset: 0,
		  },
		  axisY: {
		  	offset: 0,
		  },
		  chartPadding: 5
		});
		gdpChart.on('draw', function(data) {
			if(data.type === 'slice' && data.index == 1) {
			  data.element.attr({
			    style: 'stroke: #d7d9da'
			  });
			} else {
				data.element.attr({
				  style: 'stroke: #00a3e6'
				});
			};
		});
		function msieversion() {
		  var ua = window.navigator.userAgent;
		  var msie = ua.indexOf("MSIE ");
		   if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || (/Edge\/\d./i.test(navigator.userAgent))) {
		    	return;
		    } else {
		      gdpChart.on('draw', animate);
		    }
		   return false;
		}
		msieversion();
		$("#gdp-chart .chart-info").fadeIn(2000);
	};
	function stepChartAnimate() {
		var stepChart = new Chartist.Pie('#step-chart', {
		  series: [16, 21, 13]
		}, {
			total: 50,
		  donut: true,
		  donutWidth: 50,
		  showLabel: false
		});
		stepChart.on('draw', function(data) {
			if(data.type === 'slice' && data.index == 0) {
			  data.element.attr({
			    style: 'stroke: #00a3e6'
			  });
			} else if(data.type === 'slice' && data.index == 1) {
				data.element.attr({
				  style: 'stroke: #01cb86'
				});
			} else if(data.type === 'slice' && data.index == 2) {
				data.element.attr({
				  style: 'stroke: #00cac8'
				});
			};
		});
		function msieversion() {
		  var ua = window.navigator.userAgent;
		  var msie = ua.indexOf("MSIE ");
		    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || (/Edge\/\d./i.test(navigator.userAgent))) {
		    	return;
		    } else {
		      stepChart.on('draw', animateStep);
		    }
		   return false;
		}
		msieversion();
		
		$("#step-chart .chart-info").fadeIn(2000);
		$("#step-chart span").fadeIn(2000);
	};
	function conslusionChartAnimate() {
		var conclusionChart = new Chartist.Line('#conclusion-chart', {
		  labels: ['2015', '2017', '2020', '2025'],
		  series: [{
		    data: [0, 3, 3.7, 5, 7],
		    name: 'series-1'
		  }]
		}, {
			onlyInteger: true,
		  fullWidth: true,
		  series: {
		  	'series-1': {
      		lineSmooth: false
    		},
    	},
    	axisX: {
    		showLabel: true,
    		showGrid: true
    	},
    	axisY: {
    		showLabel: true,
    	  showGrid: true
    	}
		});
		conclusionChart.on('created', function() {
		  seq = 0;
		});
		conclusionChart.on('draw', function(data) {
		  if(data.type === 'point' && data.index !== 4) {
		    data.element.attr({
		      style: 'stroke-width: 10px; stroke: #00a3e6'
		    });
		  } else if(data.type === 'point' && data.index == 4) {
		  	 data.element.attr({
		  	 	style: 'display: none'
		  	 });
		  };
		  if(data.type === 'line') {
		    data.element.attr({
		      style: 'stroke-width: 1px; stroke: #00a3e6'
		    });
		  };
		  seq++;
		  if(data.type === 'line') {
	      data.element.animate({
	        opacity: {
	          begin: seq * delays,
	          dur: durations,
	          from: 0,
	          to: 1
	        }
	      });
	    };
		});
	};

	var arr = [
		{block: $(".c-ratingChart"), target: $(".c-ratingChart .c-bar"), flag: true, offset: 500, animate: ratingAnimate},
		{block: $(".c-ratingChart"), target: $(".c-ratingChart .c-line"), flag: true, offset: 500, animate: ratingLineAnimate},
		{block: $(".c-indicatorsChart1"), target: $(".c-indicatorsChart1 .c-bar"), flag: true,  offset: 500, animate: indicatorsAnimate},
		{block: $(".c-indicatorsChart2"), target: $(".c-indicatorsChart2 .c-bar"), flag: true,  offset: 500, animate: indicatorsAnimate},
		{block: $(".c-indicatorsChart3"), target: $(".c-indicatorsChart3 .c-bar"), flag: true,  offset: 500, animate: indicatorsAnimate},
		{block: $(".c-indicatorsChart4"), target: $(".c-indicatorsChart4 .c-bar"), flag: true,  offset: 500, animate: indicatorsAnimate},
		{block: $(".c-indicatorsChart5"), target: $(".c-indicatorsChart5 .c-bar"), flag: true,  offset: 500, animate: indicatorsAnimate},
		{block: $(".c-indicatorsChart1"), target: $(".c-indicatorsChart1 .c-line"), flag: true, offset: 500, animate: indicatorsLineAnimate},
		{block: $(".c-indicatorsChart2"), target: $(".c-indicatorsChart2 .c-line"), flag: true, offset: 500, animate: indicatorsLineAnimate},
		{block: $(".c-indicatorsChart3"), target: $(".c-indicatorsChart3 .c-line"), flag: true, offset: 500, animate: indicatorsLineAnimate},
		{block: $(".c-indicatorsChart4"), target: $(".c-indicatorsChart4 .c-line"), flag: true, offset: 500, animate: indicatorsLineAnimate},
		{block: $(".c-indicatorsChart5"), target: $(".c-indicatorsChart5 .c-line"), flag: true, offset: 500, animate: indicatorsLineAnimate},
		{block: $("#population-chart"), target: true, flag: true, offset: 500, animate: popchartAnimate},
		{block: $("#gdp-chart"), target: true, flag: true, offset: 500, animate: gdpChartAnimate},
		{block: $("#step-chart"), target: true, flag: true, offset: 500, animate: stepChartAnimate},
		{block: $("#conclusion-chart"), target: true, flag: true, offset: 500, animate: conslusionChartAnimate},
		{block: $(".c-invest"), target: true, flag: true, offset: 500, animate: animateIcon1},
		{block: $(".c-effect"), target: true, flag: true, offset: 500, animate: animateIcon2},
	];

	$(".button-up").on("click", function() {
		$('html, body').animate({
        scrollTop: $('html, body').offset().top
    }, 1000);
	});

	window.addEventListener("scroll", function() {
		if(($(".c-factors").offset().top - $(window).scrollTop() < 200)) {
			$(".button-up").fadeIn(100);
		} else {
			$(".button-up").fadeOut(100);
		};
		arr.forEach(function(item) {
			var offsetTop = item.block.offset().top - $(window).scrollTop();
				if(offsetTop <= item.offset && item.flag) {
					item.animate(item.target);
					item.flag = false;
			}
		});
	});

	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};
	var breakpoint = 550;
	var changeAmount = function() {
		if($(window).width() <= breakpoint) { 
			$(".c-ratingChart").find('div.c-bar').each(function() {
					$(this).closest("li").hide();
					if(
						$(this).hasClass('c-ratingChart__bar50') || 
						$(this).hasClass('c-ratingChart__bar24')) {
						$(this).closest("li").show();
					}
			});
		} else {
			$(".c-ratingChart").find('div.c-bar').each(function() {
					$(this).closest("li").show();
			});
		}; 
	};
	changeAmount();
	var resizing = debounce(changeAmount, 50);
	window.addEventListener('resize', resizing);
});