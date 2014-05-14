/*
 * AutoAnchors - 	A jQuery plugin that automatically creates an anchors navigation for certain
 *					elements (for example H2) inside a container element (div, body whatever ...).
 *					It automatically generates the anchors and can even make them numbered. And the
 *					whole thing is of course fully styleable through CSS.
 * 
 * Copyright (c) 2010 Fredi Bach
 * www.fredibach.ch
 *
 * Usage:

	$("div.content").autoAnchors();
 
 * Or with options (defaults are 'h2', '', false):

	$("div.content").autoAnchors( 
		{
			anchor: 'h3',
			title: '<h3>Content</h3>',
			numbering: true 
		}
	);

 * Plugin page: http://fredibach.ch/jquery-plugins/autoanchors.php
 *
 */
(function($) {
	
	$.fn.autoAnchors=function(settings){
		var defaults = {
			anchor: 'h2',
			title: '',
			numbering: true,
			numbering_anchor: true,
			offset: 0
		};
		var s = $.extend(defaults, settings);

		var mcnt = 0;
		this.each( function() {
			mcnt++;

			var links = '<div class="autoanchors">';
			if (s.title){
				links += s.title;
			}
			links += '<ul>';

			var cnt = 0;
			if ($(this).find(s.anchor).length > s.offset){
				$(this).find(s.anchor).each( function() {
					cnt++;

					var title = $(this).text();
					var filteredtitle = title.replace(/[^a-zA-Z0-9\s]+/g,'').replace(/\s/g,'_');

					if (s.numbering){
						title = '<span class="numbering">'+cnt+'</span>'+title;
						if(s.numbering_anchor){
							$(this).html('<span class="numbering">'+cnt+'</span>'+$(this).html());
						}
					}

					links += '<li><a href="#'+mcnt+'.'+cnt+'.'+filteredtitle+'">'+title+'</a></li>';
					$(this).attr("id",mcnt+'.'+cnt+'.'+filteredtitle);
				});
			}
			
			links += '</ul></div>';
			
			if (cnt > 0){
				$(this).prepend(links);
			}
		});
		
		return this;
	};
	
})(jQuery);