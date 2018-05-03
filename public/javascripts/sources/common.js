$(document).ready(function() {
	function onButtonClick () {
		const button = $(this);
		const buttonName = button.attr('data-name');
		$('.c-innovations__link_active').removeClass('c-innovations__link_active');
		button.addClass('c-innovations__link_active');
		$('.c-innovations__wrapper_active').removeClass('c-innovations__wrapper_active');
		$(`.c-innovations__wrapper[data-name="${buttonName}"]`).addClass('c-innovations__wrapper_active');
	}

	$('.c-innovations__link').on('click', onButtonClick);
});