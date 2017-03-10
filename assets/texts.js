// by @writerror writerror.com
'use strict';

$(function() {
  var $container = $('.post-list');
  var gridCols = function() {
    if ( $('body').width() >= 800 ) {
      return 3;
    } else {
      return 1;
    }
  };
  var $columnWidth = $container.width() / gridCols();
  $container.isotope({
    itemSelector: '.post-entry',
    percentPosition: true,
    masonry: {
    sortBy: 'date', sortAscending : false,
    columnWidth: $columnWidth },
    getSortData : { date: '[data-sort]' }
  });
});
