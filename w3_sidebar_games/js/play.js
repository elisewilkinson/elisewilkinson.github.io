var Play = {
	playid: $('.play-box'),
	puffinFullscreen: false,
	init: function(){
		App.activeFullscreen();
		App.rate().now(GAME);
		App.view().createMobileLayout(GAME.img);
		Play.sortGameOnMob();
		App.view().changeEmulator(GAME.slug);
		App.moveFullscreenButton();
		App.played().add(GAME.id);
		App.slide().init();
	},
	sortGameOnMob: function(){
		var list = [];
			if($('.right-box').is(":visible") == false){
				$('.fixed-games a').each(function(index, value){
					var data = {href: $(value).attr('href'), 
							img: $(value).find('.fixed-img').attr('src'),
							name: $(value).find('.fixed-name').text(),
							size: $(value).data('size'),
							stars: $(value).data('stars')
						};
						list.push(data);
				});
			};
			if(list.length > 0){
				var moreHTML = '';
					for(var i in list){
						moreHTML += '<div class="grip-item">';
						moreHTML += '<a href="'+ list[i].href +'">';
						moreHTML += '<img class="item-img" src="'+ list[i].img +'" align="left"/>';
						moreHTML += '<b class="item-text">'+ list[i].name +'</b>';
						moreHTML += '<span class="item-category">'+ list[i].size +'</span>';
						moreHTML += '<span class="item-stars">'+ list[i].stars +' ★</span>';
						moreHTML += '</a>';
						moreHTML += '</div>';
					};
					$('.more-games').prepend(moreHTML);
					setTimeout(function(){ App.slide().gripContent(); }, 300);
			}
	}
};

$(document).ready(function(){
	Play.init();
});

$(window).resize(function(){
	App.view().createMobileLayout(GAME.img);
});