var PROD = true;

$container = $('.feed-content');

$(function() {

	if (PROD == true) {
		var proxy_url = "https://ancient-forest-41773.herokuapp.com";
	} else {
		var proxy_url = "http://localhost:9292";
	}

    var flist = [
        { title: '325', url: 'https://325.nostate.net/feed/' },
        { title: 'Act For Freedom Now', url: 'http://actforfree.nostate.net/?feed=rss2' },
        { title: 'Insurrection News', url: 'https://insurrectionnewsworldwide.com/feed/' },
        { title: 'It\'s Going Down', url: 'https://itsgoingdown.org/feed/' },
        { title: 'Contra Info', url: 'https://en-contrainfo.espiv.net/feed/' },
        { title: 'Traces of Fire', url: 'https://tracesoffire.espivblogs.net/category/english/feed/' },
        { title: 'Fire On The Horizon', url: 'https://fireonthehorizon.noblogs.org/feed/' },
        { title: 'CrimethInc', url: 'http://www.crimethinc.com/blog/feed/' },
        { title: 'Infoshop', url: 'http://news.infoshop.org/rss.xml' },
        { title: 'subMedia', url: 'https://submedia.tv/stimulator/feed/' },
        { title: 'libcom', url: 'https://libcom.org/library-latest/feed' },
        { title: 'Anarchist News', url: 'http://anarchistnews.org/rss.xml' },
        { title: 'threewayfight', url: 'http://threewayfight.blogspot.com/feeds/posts/default?alt=rss' },
        { title: 'Earth First! Newswire', url: 'http://earthfirstjournal.org/newswire/feed/' },
        { title: 'NAALPO', url: 'https://animalliberationpressoffice.org/NAALPO/feed/' },
        { title: 'The Final Straw Radio', url: 'https://thefinalstrawradio.noblogs.org/feed/' },
        { title: 'ROAR Magazine', url: 'https://roarmag.org/roar-feed/' },
        { title: 'Rabble', url: 'http://rabble.org.uk/feed/' },
        { title: 'Antisocial Evolution', url: 'https://antisocialevolution.blackblogs.org/feed/' },
        { title: 'Mpalothia', url: 'http://mpalothia.net/category/english/feed/' },
    ];

	$container.before('<div class="text-center"><div id="loader" class="clearfix">Loading feeds&hellip;</div><select id="siteSort" class="hidden"><option value="*" selected="selected">All Sources</option></select></div>');

	$columnWidth = $container.width() / gridCols();
	$container.isotope({
	  itemSelector: '.feed-item',
	  percentPosition: true,
	  masonry: {
		sortBy: 'date', sortAscending : false,
		columnWidth: $columnWidth }, 
		getSortData : {
				date: '[data-sort]' }
	});


	var count = flist.length;
	$.each(flist, function(i, feed) {
		$.ajax(
		  {
			//url: proxy_dev+"/v1/feed?url=http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml&count=3&key=WE1312ACAB161"
			url: proxy_url+"/v1/feed?url="+feed.url+"&count=5&key=WE1312ACAB161"
		  }
		).fail(function() {
			console.log('Unable to load '+ feed.title);
		  }
		).done(
		  function(data) {
				var datafilter = feed.title.replace(/ /g, '-').replace(/\W/g, '');
				$('#siteSort').append('<option value="'+datafilter+'">'+feed.title+'</option>');
				$.each(data.items, function(index, element) {
					var snippet = $.trim(snip(element.description)).substring(0, 200).split(" ").slice(0, -1).join(" ") + "...";
					var datesort = _formatDate(element.published,'yyyyMMddhhmmss');
					var $bird = '<a title="Share on Twitter" href="#twitter" class="share float-right"><span class="icon icon--twitter"><svg viewBox="0 0 16 16" width="1em" height="1em"><path fill="#828282" d="M15.969,3.058c-0.586,0.26-1.217,0.436-1.878,0.515c0.675-0.405,1.194-1.045,1.438-1.809c-0.632,0.375-1.332,0.647-2.076,0.793c-0.596-0.636-1.446-1.033-2.387-1.033c-1.806,0-3.27,1.464-3.27,3.27 c0,0.256,0.029,0.506,0.085,0.745C5.163,5.404,2.753,4.102,1.14,2.124C0.859,2.607,0.698,3.168,0.698,3.767 c0,1.134,0.577,2.135,1.455,2.722C1.616,6.472,1.112,6.325,0.671,6.08c0,0.014,0,0.027,0,0.041c0,1.584,1.127,2.906,2.623,3.206 C3.02,9.402,2.731,9.442,2.433,9.442c-0.211,0-0.416-0.021-0.615-0.059c0.416,1.299,1.624,2.245,3.055,2.271 c-1.119,0.877-2.529,1.4-4.061,1.4c-0.264,0-0.524-0.015-0.78-0.046c1.447,0.928,3.166,1.469,5.013,1.469 c6.015,0,9.304-4.983,9.304-9.304c0-0.142-0.003-0.283-0.009-0.423C14.976,4.29,15.531,3.714,15.969,3.058z"></path></svg></span></a> ';
					var $zoom = '<a title="View full content" href="#" class="zoom float-right">&#128269;</a>';
					var fullContent = element.contentFull;
					if (fullContent.length <= 0) {
						fullContent = element.description;
					}
					$container.isotope('insert', $('<li/>', {
						html: '<div class="post-meta text-small"><span class="feed-title">'+feed.title+'</span> &ndash; '+_formatDate(element.published,'MM/dd')+$zoom+$bird+'</div>'+
								'<h4><a class="feed-link hidden" target="_blank" href="'+element.link+'">'+element.title+'</a></h4><article><div class="spinner"></div><div class="feed-description hidden">'+
								snippet+'</div><div class="first-image"></div></article>'+
								'<section class="hidden"><div class="feed-full_content">'+fullContent+'</div></section>'
						
					}).addClass('feed-item post-entry').attr('data-sort',datesort).attr('data-filter',datafilter));
				});
		  }
		).always( 
			function() {
				if (!--count) { loadDone(); } 
			}
		); 
	});

	function loadDone() {
		$('body').find('#loader').html('Preparing &amp; Sorting&hellip;');
		$container.find('.feed-item').each(function() {
			var $fim = $('.feed-full_content',this).find('img:first');
			    if ($fim.attr('width') == '1' && $fim.attr('height') == '1') {
					$fim.addClass('kill');
                    $fim.remove();
                }
                else if ($fim.attr('src') == 'https://libcom.org/sites/libcom.org/modules/contrib/filefield/icons/image-x-generic.png') {
                    $fim.attr('src', $fim.next('a').attr('href'));
                }
                else if ($fim.attr('src') == 'https://submedia.tv/stimulator/wp-content/plugins/flattr/img/flattr-badge-white@2x.png') {
					$fim.addClass('kill');
                    $fim.remove();
                }
                else if ($(this).find('.feed-title') == 'libcom') { 
                    var libcfirst = $fim.next('a'); //.attr('href');
                    $fim.attr('src', libcfirst.attr('href'));
                }
				if ($fim.length && !$fim.hasClass('kill')) {
					$('.feed-description',this).append($fim.clone().addClass('firstimg'));
				}
		});
		$container.imagesLoaded().progress( function(instance, image) {
			//var result = image.isLoaded ? 'loaded' : 'broken';
			//console.log( 'image is ' + result + ' for ' + image.img.src );
        }).fail( function() {
			//console.log('all images loaded, at least one is broken');
		}).always( function () {
			$('#loader').remove();
			$('.spinner').remove();
			$container.find('.feed-link, .feed-description').show();
			$('#siteSort').show(function() {
				var selectList = $('#siteSort option');
				selectList.sort(function(a,b){
					A = a.value.toLowerCase();
					B = b.value.toLowerCase();
					 if (A < B){
						return -1;
					 }else if (A > B){
					   return  1;
					 }else{
					   return 0;
					 }
				});
				$('#siteSort').html(selectList).val('*').change();
			});
			$container.isotope({sortBy: 'date', sortAscending: false}); 
		});
	}

    var _formatDate = function(date,mask) {

        // Convert to date and set return to the mask
        var fmtDate = new Date(date);
        date = mask;

        // Replace mask tokens
        date = date.replace('dd', _formatDigit(fmtDate.getDate()));
        date = date.replace('MMMM', _getMonthName(fmtDate.getMonth()));
        date = date.replace('MM', _formatDigit(fmtDate.getMonth()+1));
        date = date.replace('yyyy',fmtDate.getFullYear());
        date = date.replace('hh', _formatDigit(fmtDate.getHours()));
        date = date.replace('mm', _formatDigit(fmtDate.getMinutes()));
        date = date.replace('ss', _formatDigit(fmtDate.getSeconds()));

        return date;
    }

    var _formatDigit = function(digit) {
        digit += '';
        if (digit.length < 2) digit = '0' + digit;
        return digit;
    }

    var _getMonthName = function(month) {
        var name = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return name[month];
    }

	$('#siteSort').on('change', function() {
		var site = $( "#siteSort option:selected" ).val();
		if (site == '*') {
				$('.feed-item').fadeIn('fast');
				$container.isotope({masonry: { columnWidth: $container.width() / gridCols() }, sortBy: 'date', sortAscending: false, filter: ".feed-item"});
		} else {
			$container.find('.feed-item').fadeOut('fast').promise().done(function() {
				$container.find("[data-filter='" + site + "']").fadeIn('fast');
			});
			$container.isotope({masonry: { columnWidth: $container.width() / gridCols() }, sortBy: 'date', sortAscending: false, filter: "[data-filter='"+site+"']"});
		}
		$(this).blur();
	});

	var snip = function(text) {
		var wrapped = $("<div>" + text + "</div>");
		return wrapped.text();
	}

	function gridCols() {
		if ( $('body').width() >= 992 ) {
			return 5;
		} else if ( $('body').width() >= 800 ) {
			return 3;
		} else {
			return 1;
		}
	}

    $('body').on('click', '.share', function() {
        var sharesite = $(this).attr('href');
        var artsel = $(this).parent().siblings('h4').find('.feed-link');
        var artit = artsel.text();
        var artlink = artsel.attr('href');
        switch (sharesite) {
            case '#facebook' :
            var url = 'http://www.facebook.com/share.php?u='+artlink+'&t='+artit;
            break;
            case '#twitter' :
            var url= 'http://twitter.com/intent/tweet?url='+encodeURIComponent(artlink)+'&text='+encodeURIComponent(artit)+'&via=writerror';
            break;
            case '#tumblr' :
            var url = 'http://www.tumblr.com/share?v=3&u='+encodeURIComponent(artlink)+'&t='+encodeURIComponent(artit);
            break;
        }
        window.open(url, 'sharepop', 'width=520,height=436,scrollbars,resizable');
        return false;
    });

	$('.post-content').on('click', '.zoom', function() {
		$('#full-content').html(
			'<div class="post-meta">'+$(this).parent('.post-meta').html()+'</div><h4>'+$(this).parent().siblings('h4').html()+'</h4><article>' + $(this).parent().siblings('section').html() + '</article>'
		);
		$('body').addClass('noscroll');
		$('#overlay').show().animate({scrollTop: '0'}, 300);
		return false;
	});
	$('body').on('click', '#overlay',  function(e) {
		if ($(e.target).is('a')) {
			return true;
		} else {
			$('body').removeClass('noscroll');
			$('#overlay').hide();
		}
	});
	$(document).keyup(function(e) {
		if (e.keyCode == 27) { $('body').removeClass('noscroll'); $('body').find('#overlay').hide(); }   // esc
	});

	var $overlay = $('<div id="overlay" class="hidden"><div id="full-content">foo</div></div>');
	$('body').append($overlay);

});
