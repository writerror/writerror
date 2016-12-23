$(function() { 
	$('.site-header').click(function() { $('html, body').animate({scrollTop: '0px'}, 300); });
	$('.menu-icon').click(function() { $('.trigger').toggle(); }); 
});
$(window).on('scroll', function(){ console.log('k'); var header = $('.site-header'), scroll = $(window).scrollTop(); if (scroll >= 70) header.addClass('darken'); else header.removeClass('darken'); });
