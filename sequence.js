$(document).ready( function() {

	$('.pad').click( function() { 
		updateState($(this));
	});

	// $('.pad').bind("contextmenu", function(e) {
	// 	event.preventDefault();
	// });

	var bpm = 120;
	var breathtime = 2;


	var beattime = 60/bpm*1000/4;
	var beat = 1;
	var timer = $.timer(function(e) {
		for(var i=1;i<=16;i++) {
			var curpad = $('.row:nth-child(' + i + ')').
				find('.pad:nth-child(' + beat + ')');
			var currow = curpad.closest('.row');

			if( curpad.hasClass('on') ) {

				var curtop = currow.prev().find('.pad:nth-child(' + beat + ')');
				var dist = 1;
				while(curtop.length > 0) {
					curtop.delay(dist*beattime).
						animate({ opacity: 0.4 }, beattime * breathtime).
						animate({ opacity: 1.0 }, beattime * breathtime).
						addClass('up');
					dist += 1;
					curtop = curtop.closest('.row').prev().find('.pad:nth-child(' + beat + ')');
				}

				var curdown = currow.next().find('.pad:nth-child(' + beat + ')');
				var dist = 1;
				while(curdown.length > 0) {
					curdown.delay(dist*beattime).
						animate({ opacity: 0.4 }, beattime * breathtime).
						animate({ opacity: 1.0 }, beattime * breathtime).
						addClass('up');
					dist += 1;
					curdown = curdown.closest('.row').next().find('.pad:nth-child(' + beat + ')');
				}

				var curleft = curpad.prev();
				var dist = 1;
				while(curleft.length > 0) {
					curleft.delay(dist*beattime).
						animate({ opacity: 0.4 }, beattime * breathtime).
						animate({ opacity: 1.0 }, beattime * breathtime).
						addClass('left');
					dist += 1;
					curleft = curleft.prev();
				}

				curpad.next().
					animate({ opacity: 0.4 }, beattime * breathtime).
					animate({ opacity: 1.0 }, beattime * breathtime).
					addClass('right');
			}
			if( curpad.hasClass('right') ) {
				curpad.next().
					animate({ opacity: 0.4 }, beattime * breathtime).
					animate({ opacity: 1.0 }, beattime * breathtime).
					addClass('right');
			}
		}

		beat = 1+beat% 16;
	})
	timer.set( {time : beattime,
		autostart : true } );
});

function updateState(elem) {
	if(elem.hasClass('on')) {
		elem.removeClass('on');
	} else {
		elem.addClass('on');
	}
}