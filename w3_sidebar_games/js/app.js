var App = {
	puffinFullscreen: false,
	playid: $('.play-box'),
	init: function(){
		App.oldVersion();
		App.flash().init();
		App.view().doSearch();
		App.gotoTop();
		App.slide().init();
	},
	isMobile: function() {
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	},
	isPuffin: function(){
		try{
			var userAgent = navigator.userAgent.toLowerCase();
				if(userAgent.indexOf('puffin') != -1){
					return true;
				};
		}catch(e){
			console.log(e);
		}
		return false;
	},
	iOS: function() {
	  return [
		'iPad Simulator',
		'iPhone Simulator',
		'iPod Simulator',
		'iPad',
		'iPhone',
		'iPod'
	  ].includes(navigator.platform)
	  /* iPad on iOS 13 detection */
	  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
	},
	isBasilisk: function(){
		var userAgent = navigator.userAgent.toLowerCase();
			if(userAgent.indexOf('basilisk') != -1){
				return true;
			}
			return false;
	},
	isSmallScreen: function(){
		if(App.isMobile() || $(window).width() < 600){
			return true;
		}
		return false;
	},
	isRotate: function(){
		if($(window).width() > $(window).height() && $(window).height() < 500){
			return true;
		}
		return false;
	},
	bytesToSize: function(bytes) {
		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes == 0) { return '0 Byte'; }
		var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
	},
	jqGetOuterHtml: function(section){
		return $('<div>').append($(section).clone()).html();
	},
	nFormatter: function(num, digits) {
		var si = [
			{ value: 1, symbol: " Views" },
			{ value: 1E3, symbol: "k" },
			{ value: 1E6, symbol: "M" },
			{ value: 1E9, symbol: "G" },
			{ value: 1E12, symbol: "T" },
			{ value: 1E15, symbol: "P" },
			{ value: 1E18, symbol: "E" }
			];
		var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
		var i;
		for (i = si.length - 1; i > 0; i--) {
			if (num >= si[i].value) {
				break;
			}
		}
		return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
	},
	toSlug: function(str){
		str = str + '';
		str = str.replace(/^\s+|\s+$/g, '');
        str = str.toLowerCase();
        var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
        var to = "aaaaaeeeeeiiiiooooouuuunc------";
			for (var i = 0, l = from.length; i < l; i++) {
				str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
			};
        str = str.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a').replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e').replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i').replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o').replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u').replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y').replace(/đ/gi, 'd').replace(/\.+/g, '-').replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace('039-', '-');
        return str
	},
	unslug: function(str){
		return str.replace(/\-|\_/gi, ' ');
	},
	ucwords: function(str) {
		return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
			return $1.toUpperCase();
		});
	},
	setCookie: function(cname, cvalue, exdays) {
		const d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		let expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	},
	msg: function(obj){
		if(typeof obj == 'string'){
			alert(obj);
		}else{
			alert(JSON.stringify(obj));0
		}		
	},
	getCookie: function(cname) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	},
	oldVersion: function(){
		$('.old-version').click(function(){
			App.setCookie('layout', 'default', 1);
			if(App.getCookie('layout') == 'default'){
				location.reload();
			}
		});
	},
	requestFullScreen: function(el) {
		if(App.iOS()){
			App.playid.css({position: 'fixed', left:0, top: 0, right:0, bottom:0, zIndex: 999});
			$('body, html').css({'overflow': 'hidden'});
			App.view().createMobileLayout();
		}else{
			/* Supports most browsers and their versions. */
			var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
			if(App.isPuffin()){
				App.puffinFullscreen = true;
				App.view().createMobileLayout();
			};
			if (requestMethod) { /* Native full screen.*/
				requestMethod.call(el);
			} else if (el.webkitEnterFullscreen){	
				el.webkitEnterFullscreen(); /* on iPhone */
			} else if (typeof window.ActiveXObject !== "undefined") { /* Older IE.*/
				var wscript = new ActiveXObject("WScript.Shell");
				if (wscript !== null) {
					wscript.SendKeys("{F11}");
				}
			};
			return false;
		}
	},
	isFullscreen: function(){
		if(App.isPuffin()){
			return App.puffinFullscreen;
		}else if(App.iOS()){
			if(App.playid.css('position') == 'fixed'){
				return true;
			}
		}
		return window.innerHeight == screen.height;
	},
	cancelFullScreen: function(callback, img) {
		if(App.isFullscreen()) {
			if(App.iOS()){
				App.playid.css({position: 'relative', left: 'auto', top: 'auto', right: 'auto', bottom: 'auto', zIndex: 999});
				$('body, html').css({'overflow': 'auto'});
				App.view().createMobileLayout(img);
			}else{	
				var el = document;
				var requestMethod = el.cancelFullScreen||el.webkitCancelFullScreen||el.mozCancelFullScreen||el.exitFullscreen||el.webkitExitFullscreen;
				if(App.isPuffin()){
					App.puffinFullscreen = false;
				};
				if (requestMethod) { /* cancel full screen.*/
					requestMethod.call(el);
				} else if (typeof window.ActiveXObject !== "undefined") { /* Older IE.*/
					var wscript = new ActiveXObject("WScript.Shell");
					if (wscript !== null) {
						wscript.SendKeys("{F11}");
					}
				};
				if(callback != undefined){
					callback();
				};
			}
		}
	},
	activeFullscreen: function(){
		$('#fullscreen-btn').click(function(){
			App.requestFullScreen( $('.play-box').get(0) );
		});
	},
	moveFullscreenButton: function(){
		if($('.play-nav').is(":visible") == false){
			var btnHTML = App.jqGetOuterHtml('#fullscreen-btn');
				$('#fullscreen-btn').remove();
				$('.para-box:first').append(btnHTML);
				$('#fullscreen-btn').css({marginRight: 'auto', marginTop: '2px'}).wrap('<div class="para-item"></div>');
				App.activeFullscreen();
		}	
	},
	gotoTop:function(){
		if(!App.isMobile()){
			$(window).scroll(function(){
				if($(this).scrollTop() > 30){
					if($('.goto-top-btn').get(0) == undefined){
						$('body').append('<div style="background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE2IDE2IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iOCwyLjggMTYsMTAuNyAxMy42LDEzLjEgOC4xLDcuNiAyLjUsMTMuMiAwLDEwLjcgIi8+DQo8L3N2Zz4=) center center no-repeat red;width:60px;height:30px;position:fixed;bottom:0;right:10px;z-index:9999;cursor:pointer;border-radius:5px 5px 0 0;box-shadow:0 5px 15px 5px rgba(0,0,0,0.6);opacity:0.6" class="goto-top-btn"></div>');
						$('.goto-top-btn').hover(function(){$(this).css({opacity:1})}, function(){$(this).css({opacity:0.6})});
					};
				}else{
					$('.goto-top-btn').remove();	
				};
			});
			/* Action */
			$('body').on('click', '.goto-top-btn', function(){ 
				$('html,body').animate({ scrollTop: 0 }, 300);
			});
		}
	},
	flash: function(){
		return {
			init: function(){
				this.reload(); /* Reload site if flash installed */
				this.attackRequestOfUsers(); /* Use can request all games when not install flash player */
			},
			reload: function(){
				var flashPlayer = App.getCookie('flash_player'); 
					console.log('Flash Player is', flashPlayer);
					if(FlashDetect.installed && flashPlayer != 'on'){
						App.setCookie('flash_player', 'on', 7);
						console.log('Adobe Flash Player is ', flashPlayer);
						if(App.getCookie('flash_player') == 'on'){
							window.location.reload();
						}
					}
			},
			attackRequestOfUsers: function(){
				$('.default-btn').unbind('click');
				$('.default-btn').bind('click', function(){
					var filter = $(this).data('filter');
						if(filter == 'all-games'){
							App.setCookie('user_request', 'all', 7);
							if(App.getCookie('user_request') == 'all'){
								window.location.reload();
							};
							return false;
						}else if(filter == 'for-you'){
							App.setCookie('user_request', 'emulator', 7);
							if(App.getCookie('user_request') == 'emulator'){
								window.location.reload();
							};
							return false;
						}
						
				});
			},
			getPlayable: function(categorySlug){
				var flashPlayer = App.getCookie('flash_player'),
					userRequest = App.getCookie('user_request');
					if((!FlashDetect.installed && flashPlayer != 'on' && userRequest != 'all') || categorySlug == 'emulator' || categorySlug == 'ruffle' || categorySlug == 'mac' || categorySlug == 'without-flash'){ 
						return true;
					}else { 
						return false;
					};
			},
			getStatus: function(){
				if(FlashDetect.installed || App.getCookie('user_request') == 'all'){
					return 'all';
				}
				return 'emulator';
			}
		};
	},
	slide: function(){
		return {
			init:function(){
				if(App.scrolling == undefined){
					App.scrolling = false;	
				};
				this.largeContent();
				this.gripContent();
			},
			largeContent: function(isResize){
				$('.large-content').each(function(key, val){			
					var itemLC = $(val).find('.large-item').outerWidth(true),
						total = $(val).find('.large-item').length;
					var wrapperWidth = 	itemLC * total;
						$(val).css({width: wrapperWidth});
					var panel = $(val).parents('.large-panel');	
						if(isResize == undefined){
							App.slide().setNextAndPrevious(panel.find('.panel-next'), panel.find('.panel-previous'), panel.find('.panel-scrollbar'), panel.find('.panel-scrollbar').width(), wrapperWidth);
						};
						if(App.isBasilisk()){
							var lastHeight = $(val).parent('.panel-scrollbar').height();
								$(val).parents('.large-panel').css({overflow: 'hidden', height: lastHeight + 30});
								$(val).parent('.panel-scrollbar').not('.no-scrollbar').css({height: lastHeight + 40});
						}
				});
			},
			gripContent: function(p, next){
				var parentId = (p != undefined) ? p+' ' : '',
					totalBlocks = 4 * 4;
					$(parentId+'.panel-scrollbar').each(function(key, val){
						var contentWidth = $(val).width()-2,
							itemOutWidth = $(val).find('.grip-item:first').outerWidth(true),
							itemWidth = $(val).find('.grip-item:first').width(),
							itemMargin = itemOutWidth - itemWidth,
							totalItem = $(val).find('.grip-item').length;
						var cols = 	Math.round((((contentWidth - itemMargin)/itemOutWidth) * 100)/100),
							newItemWidth = ((contentWidth - itemMargin)/cols) - itemMargin;
							$(val).find('.grip-item').css({width: newItemWidth});
						var maxWidth = (newItemWidth + itemMargin)  * totalBlocks;
							if(totalItem < totalBlocks){
								maxWidth = (newItemWidth + itemMargin)  * totalItem;
							};
							$(val).find('.grip-content:not(.no-resize)').css({width: maxWidth});
						
							var gripPanel = $(val).parent('.grip-panel');
								if(maxWidth > gripPanel.width() && next != true){
									App.slide().setNextAndPrevious(gripPanel.find('.panel-next'), gripPanel.find('.panel-previous'), val, contentWidth, maxWidth);
								};						
								if(App.isBasilisk()){
									var lastHeight = $(val).height();
										$(val).not('.no-scrollbar').parents('.grip-panel').css({overflow: 'hidden', height: lastHeight + 30});
										$(val).not('.no-scrollbar').css({height: lastHeight + 40});
								};					
							
					});
					this.sortGripContent('#popular-box', 3);
			},
			sortGripContent: function(section, rows){
				var gripItem = $(section).find('.grip-item:first'),
					itemWidth = gripItem.outerWidth(true);
				var blockHTML = '',
					nextBlock = 0;	
					 $(section+ ' .grip-item').each(function(index, item){
						 if(index%rows == 0){
							 blockHTML += '<div style="width:'+itemWidth+'px;float:left;margin:0;padding:0;border:0">';
							 nextBlock = 0;
						 };
						 blockHTML += App.jqGetOuterHtml(item);
						 nextBlock++;
						 if(nextBlock == rows){
							 blockHTML += '</div>';
						 }
					 });
					 $(section).html(blockHTML);
					 if(typeof js != 'undefined' && js.actived == true){
						js.pushLinksToState(section);
					 }
			},
			setNextAndPrevious: function(nextButton, preButton, val, contentWidth, maxWidth){
			   _this = this;		
				nextButton.show();				
				nextButton.unbind('click');
				nextButton.bind('click', function(){
					var lastScolleft = $(val).scrollLeft();
						App.scrolling = true;
						$(val).animate({scrollLeft: lastScolleft + contentWidth}, function(){							
							if($(val).scrollLeft() > 0){
								preButton.show();
							};
							if($(val).scrollLeft() + contentWidth >= maxWidth-10){
								nextButton.hide();
							};
							App.scrolling = false;
						});
						
				});
				preButton.unbind('click');
				preButton.bind('click', function(){
					var lastScolleft = $(val).scrollLeft();
						App.scrolling = true;
						$(val).animate({scrollLeft: lastScolleft - contentWidth}, function(){
							if($(val).scrollLeft() < 1){
								preButton.hide();
							};
							if($(val).scrollLeft() < maxWidth - contentWidth){
								nextButton.show();
							};
							App.scrolling = false;
						});
				});
				var rollScrollLeftFn = function(val, _this){
					if(App.scrolling == false){
						var itemWidth = (typeof $(_this).find('.large-item:first').get(0) != 'undefined') ? 
							$(_this).find('.large-item:first').outerWidth(true) : 
							$(_this).find('.grip-item:first').outerWidth(true),
							cols = Math.round( $(_this).scrollLeft() / itemWidth);
						var moveToScrollLeft = cols * itemWidth; 
						var wrapperScrollWidth = (typeof $(_this).find('.large-content').get(0) != 'undefined') ? $(_this).find('.large-content').width() : $(_this).find('.grip-content').width(),
							currentScrollLeft = parseInt($(_this).scrollLeft()) + parseInt($(_this).width());
							if((itemWidth * 52/100) + currentScrollLeft > wrapperScrollWidth){
								$(val).animate({scrollLeft: wrapperScrollWidth});
							}else{
								$(val).animate({scrollLeft: moveToScrollLeft});
							};
					}	
				};
				var timer = null;
					$(val).unbind('scroll');
					$(val).scroll(function(){	
						if(timer !== null) {
							clearTimeout(timer);        
						};
						if($(this).scrollLeft() < 1){
							preButton.hide();
						};
						if($(this).scrollLeft() < maxWidth - contentWidth){
							nextButton.show();
						};
						if($(this).scrollLeft() > 0){
							preButton.show();
						};
						if($(this).scrollLeft() + contentWidth >= maxWidth-10){
							nextButton.hide();
						};
						if(App.isMobile()){
							var _this = this;
								timer = setTimeout(function() {
									rollScrollLeftFn(val, _this);
								}, 300);
						}
					});
					/* Rescroll when mouse leave */
					$(val).on('mouseleave', function(){
						rollScrollLeftFn(val, this);
					});
			}
		};
	},
	DB: function(){
		this.games = (this.games) ? this.games : [];
		this.working = (this.working) ? this.working : [];
		this.isReady = (this.isReady) ? this.isReady : false;		
		this.startup = function(){
			this.table();
		};
		this.loading = function(){
			$('body').append('<div id="waiting_ready" style="background:rgba(0,0,0,0.35);position:fixed;left:0;top:0;right:0;bottom:0;z-index:999"></div>');
			setTimeout(function(){$('#waiting_ready').fadeOut();}, 5000);
			return this;
		};
		this.endLoading = function(){
			$('#waiting_ready').fadeOut();
			return this;
		};
		this.table = function(tableName){			
			var tableName = (typeof tableName == 'undefined') ? 'games' : tableName,
				_this = this;
				/* When table is a array object */
				if (tableName.length > 0 && tableName.constructor === Array && typeof tableName[0] != 'undefined') {
					_this.working = tableName;
					return this;
				};
				/* Get data form json file */
				_this.isReady = false;
				if(_this.games.length < 1){
					$.getJSON(settings.baseUrl + 'public/js/json/'+tableName+'.js', {t: new Date().getHours()}, function(games) {
						if (games.length > 0 && games.constructor === Array && typeof games[0] != 'undefined') {
							_this.games = games;
							_this.working = games;
							_this.isReady = true;			
						};
					});
				}else{
					_this.working = _this.games;
					_this.isReady = true;
				}
				return this;
		};
		this.tableWithLoading = function(tableName){
			this.loading();
			this.table(tableName);
			return this;			
		};
		this.from = function(tableName){
			this.table(tableName);
			return this;
		};
		this.ready = function(callback, timer, times){
			var _this = this,
				timer = (typeof timer == 'undefined') ? 1 : timer,
				times = (typeof times == 'undefined') ? 3000 : times;
			var counter = 0,
				timeout = setInterval(function(){
					if(counter > times){
						clearInterval(timeout);
					}
					if(_this.isReady == true){
						if(typeof callback == 'string'){
							window[callback](_this.working);
						}else if(typeof callback == 'function'){
							callback(_this.working);
						};
						clearInterval(timeout);
					}
					counter++;
				}, timer);		
		};
		this.where = function(fields, math, tableName, callback){
			var _this = this;
				_this.ready(function(){
					if(typeof fields == 'object'){
						var rows = (tableName != undefined && tableName instanceof Array) ? tableName : _this.working, resultData=[];
							_this.isReady = false;
							if(rows instanceof Array && rows.length > 0){
								resultData = rows.filter(function(row){
									var result = false;
										for(var field in fields){
											try{
												if(math == undefined || math == '='){
													if(typeof(row[field]) != 'undefined' && typeof(row[field]) != 'function' && row[field] == fields[field]){
														result = true;
														break;
													};
												}else if(math == '<>'){
													if(typeof(row[field]) != 'undefined' && typeof(row[field]) != 'function' && row[field] != fields[field]){
														result = true;
														break;
													};
												}else if(math == '>'){
													if(typeof(row[field]) != 'undefined' && typeof(row[field]) != 'function' && row[field] > fields[field]){
														result = true;
														break;
													};
												}else if(math == '<'){
													if(typeof(row[field]) != 'undefined' && typeof(row[field]) != 'function' && row[field] < fields[field]){
														result = true;
														break;
													};
												}else if(math == 'LIKE'){									
													var pattern = new RegExp(fields[field], 'gi');
														if(typeof(row[field]) != 'undefined' && typeof(row[field]) != 'function' && pattern.test(row[field])){
															result = true;
															break;
														};
												};
											}catch(e){
												if (this.debug) { 
													console.warn(e.message); 
												};
											}	
										};
									return result;
								});
						};
						_this.working = resultData;
						_this.isReady = true;
						
						/* Call function */
						if(typeof(callback) != 'undefined'){
							callback(resultData);
						};
					};
				});
				
			return this;				
		};
		this.whereLike = function(fields, callback, tableName){ 
			this.where(fields, 'LIKE', tableName, callback);
			return this;
		};
		this.whereEq = function(fields, callback, tableName){
			this.where(fields, tableName, callback);
			return this;
		};
		this.whereNot = function(fields, callback, tableName){
			this.where(fields, '<>', tableName, callback);
			return this;
		};
		this.whereGt = function(fields, callback, tableName){
			this.where(fields, '>', tableName, callback);
			return this;
		};
		this.whereLt = function(fields, callback, tableName){
			this.where(fields, '<', tableName, callback);
			return this;
		};
		this.whereIn = function(fields, callback, tableName){
			var _this = this;
				_this.ready(function(){
					if(typeof fields == 'object'){
						var rows = (tableName != undefined && tableName instanceof Array) ? tableName : _this.working, resultData=[];
							_this.isReady = false;
							if(rows instanceof Array && rows.length > 0){
								var r = rows.filter(function(row){
									var result = false;
										for(var field in fields){
											try{
												var inArray = fields[field].split(',');
												var index = inArray.indexOf(row[field]+'');
												if(typeof(row[field]) != 'undefined'&& typeof(row[field]) != 'function' && index != -1){
													resultData[index] = row;
													result = true;
													break;
												};
											}catch(e){
												if (this.debug) { 
													console.warn(e.message); 
												};
											}	
										};
									return result;
								});
						};
						_this.working = resultData;
						_this.isReady = true;
						
						if(typeof(callback) != 'undefined'){
							callback(resultData);
						};
					};
				});
			return this;				
		};
		this.orderBy = function(field, _order){ 
			var _this = this;
				_this.ready(function(){
					_this.isReady = false;						
					var array = _this.working,
						attrs = [];
						if(typeof field === 'object' && !Array.isArray(field) && field !== null){
							$.each(field, function(key, value){
								var order = (value.toLowerCase() == 'asc') ? '' : '-';
									attrs.push(order + key);
							});
						}else{
							var order = (typeof _order != 'undefined' && _order.toLowerCase() == 'asc') ? '' : '-';
								attrs = [order + field];
						}
					var predicates = attrs.map(function(pred){
							var descending = pred.charAt(0) === '-' ? -1 : 1;
							pred = pred.replace(/^-/, '');
							return {
								getter: function(o){ return o[pred];}/*o => o[pred]*/,
								descend: descending
							};
						});
						_this.working = array.map(function(item){
							return {
								src: item,
								compareValues: predicates.map(function(predicate){ return predicate.getter(item);}/*predicate => predicate.getter(item)*/)
							};
						})
						.sort(function(o1, o2) {
							var i = -1, result = 0;
								while (++i < predicates.length) {
									if (o1.compareValues[i] < o2.compareValues[i]) result = -1;
									if (o1.compareValues[i] > o2.compareValues[i]) result = 1;
									if (result *= predicates[i].descend) break;
								}
								return result;
							})
						.map(function(item){return item.src;}/*item => item.src*/);
						_this.isReady = true;
				});
			return this;	
		};
		this.limit = function(offset, take){
			var _offset = (typeof take == 'undefined') ? 0 : offset;
			var _take = (typeof take == 'undefined') ? offset : (take + _offset);
			var _this = this;
				_this.ready(function(){
					_this.isReady = false;
					_this.working = _this.working.slice(_offset, _take);
					_this.isReady = true;
				});
				return this;
		};
		this.get = function(callback){
			this.ready(callback);
		};
		return this;
	},
	rate: function(){
		return {
			id: 'games_voted_list',
			to: function(star){
				$('#ratings .star').each(function(){
				   $(this).removeClass('selected');
				});
				$('#ratings .star[data-star="'+star+'"]').addClass('selected');
			},
			now: function(GAME){
				this.to(GAME.voted);
				var lastStar = $('#ratings .star.selected').data('star');
					$('#ratings .star').hover(function(){ 
						var star = $(this).data('star');
							$('#ratings .star').removeClass('selected');
							$('#ratings .star').each(function(i, s){
								var currentStar = $(s).data('star');
									if(currentStar <= star){
										$(s).addClass('selected');
									}
							});
					}, function(){
						$('#ratings .star').removeClass('selected');
						$('#ratings .star').each(function(i, s){
							var currentStar = $(s).data('star');
								if(currentStar <= lastStar){
									$(s).addClass('selected');
								}
						});
					});
					$('#ratings .star').one('click', function(){			
						if(App.rate().has(GAME.id) == false){
							var star = $(this).data('star'),
								_csrfToken = $('meta[name="csrf-token"]').attr('content'),
								_this = this;
								$('.vote-status').show().text('You are voting...');
								$.post(settings.baseUrl + 'vote/game/' + GAME.id, {'_token': _csrfToken, 
									star: star, 
									last_voted: GAME.voted, 
									star_counter: GAME.star_counter, 
									star_user: GAME.star_user}, function(voted){
									if(voted && voted > 0){
										$('#game_voted').html('<i style="color:red">'+voted+'</i>');
										App.rate().to(voted);
										$('.vote-status').text('Thank You for Voting!');
										setTimeout(function(){ $('.vote-status').hide(); }, 2000);
										
										/* Update voted to JSON */
										App.getDatabase(function(games){
											for(var i in games){
												if(games[i].u != undefined){
													if(games[i].u == GAME.slug){
														games[i].voted = voted;
														break;
													}
												}
											}
										});
									}
								});
						}else{
							$('.vote-status').show().text('You have voted for this game!');
							setTimeout(function(){ $('.vote-status').hide(); }, 1000);
						}
					});
			},
			has: function(gameId){
				var lastGameId = App.getCookie(this.id);
					if(lastGameId && lastGameId.indexOf(gameId + '|') != -1){
						return true;
					}else{
						App.setCookie(this.id, lastGameId + gameId + '|', 7);
						console.log('Voted: ', gameId);
					}
					return false;
			}
		};
	},
	played: function(playedId){
		return {
			limit: 40,
			expired: 7,
			id: 'last_played_list',
			add: function(gameId){
				var lastPlayedList = this.truncate(App.getCookie(this.id));
					if(lastPlayedList.indexOf(','+ gameId) == -1){
						lastPlayedList += ','+gameId;
					}else{
						lastPlayedList = lastPlayedList.replace(','+gameId, '') + ',' + gameId;
					}
					App.setCookie(this.id, lastPlayedList, this.expired);
					console.log('Last played added: [', gameId, '] '+lastPlayedList);
					return this;
			},
			truncate: function(cookie, n){
				var limit = (typeof n != 'undefined') ? n : this.limit,
					lastPlayedList = this.trim(cookie, ','),
					arrayLastPlayed = lastPlayedList.split(',');
					if(arrayLastPlayed.length > limit){
						var shortArrayPlayed = arrayLastPlayed.reverse().slice(0, limit);
						return shortArrayPlayed.reverse().join(',');
					}
					return cookie;
			},
			trim: function(cookie){
				return cookie.replace(/^\,+|\,+$/gi, '');
			},
			toArray: function(order){
				var lastPlayedList = this.trim(App.getCookie(this.id), ','),
					arrayLastPlayed = lastPlayedList.split(',');
					if(typeof order != 'undefined' && order.toLowerCase() == 'ASC'){
						return arrayLastPlayed;
					}else{
						return arrayLastPlayed.reverse();
					}
			}
		};
	},
	view: function(){
		return {
			load: function(objectId, theme, comfirm, callback){
				var fn = (typeof callback == 'undefined') ? comfirm : callback,
					csrfToken = $('meta[name="csrf-token"]').attr('content'),
					themePath = settings.publicUrl + theme;
					$.get(themePath + '?t='+ new Date().getHours(), {'_token': csrfToken}, function(result){
						if(result){
							$(objectId).append(result);
							var doneCounter = 0,
								stoDone = setTimeout(function(){
								if(doneCounter > 500){
									clearTimeout(stoDone);
									fn(false);
								}else{
									if($(comfirm).get(0) != undefined){
										fn(result);
										clearTimeout(stoDone);
									}
								}
								doneCounter++;
							}, 10);					
						}else{
							fn(false);
						};
					});
				return this;	
			},
			doSearch: function(){
				$('#search').submit(function(){
					var value = $.trim($(this).find('input[type="text"]:first').val()),
						categorySlug = '';
						if(value != ''){
							categorySlug = App.toSlug(value);
							location.href = settings.baseUrl + categorySlug;
						}
						return false;
				});
			},
			changeEmulator: function(slug){
				$('.para-emulator span').unbind('click');
				$('.para-emulator span').bind('click', function(){
					var emul = $(this).data('emul');
						$('.para-emulator span').removeClass('pactived');
						$(this).addClass('pactived');
						if(emul){
							$('#iframe_container').parent().html('<iframe id="iframe_container" src="'+ settings.baseUrl + 'embed/'+ slug+ '?emulator='+ emul +'" width="100%" height="100%" scrolling="no" frameborder="0" marginheight="0" marginwidth="0" webkitAllowFullScreen="webkitAllowFullScreen" mozallowfullscreen="mozallowfullscreen" allowFullScreen="allowFullScreen"></iframe>');	
						};
				});
			},
			createMobileLayout: function(img){
				var iframeId = $('#iframe_container');
					if(App.isSmallScreen()){
						if(App.isFullscreen()){
							var menuWeight = 50;					
								$('.mobile-overplaybox').remove();
								if($('.mobile-menu').get(0) == undefined){
									iframeId.after('<div class="mobile-menu"><a href="'+ settings.baseUrl +'" class="fs-logo">FSG</a><button class="mobile-close-btn">X</button></div>');
								}
								if(App.isRotate()){
									menuWeight = 60;
									iframeId.css({width: $(window).width() - menuWeight, height: $(window).height()});
									$('.mobile-menu').addClass('rotate');
									$('.rotate .fs-logo').css({top: $(window).height() - 36});
								}else{
									iframeId.css({height: $(window).height() - menuWeight, width: '100%'});
									$('.mobile-menu').removeClass('rotate');
								}
								/* Active click button */
								$('.mobile-close-btn').click(function(){
									App.cancelFullScreen(function(){ $('.mobile-menu').remove(); }, img);
								});
							
						}else{
							$('.mobile-menu').remove();
							if($('.mobile-overplaybox').get(0) == undefined){
								var imgCode = (img == undefined || img.indexOf('/flash.jpg') != -1) ? '' : '<img src="' +img +'" width="106" height="106">';
									iframeId.after('<div class="mobile-overplaybox"><div class="mobile-content">'+imgCode+'<button class="playnow">PLAY NOW</button></div></div>');
									App.playid.css({height: $(window).height() - 290, minHeight: 222});
									/* Active fullscreen */
									$('.playnow').click(function(){
										App.requestFullScreen( App.playid.get(0) );
									});
							};
							iframeId.css({height: '100%', width: '100%'});
						}
					}
			}
		};
	},
	testEmulators: function(){
		return {
			uploadPathRecently: '',
			targetFile: '',	
			init: function(){
				var _this = this;
					$('#choose-file').click(function(){ $('#file').click(); });
					$('#file').change(function(e){
						_this.targetFile = e.target.files[0].name;
						var ext = _this.targetFile.split('.').pop();
							if(ext.toLowerCase() == 'swf'){
								$('#choose-file').val( _this.targetFile );
								$('#emulators-file-upload button[type="submit"]').prop('disabled', false);
							}else{
								$('#playing').html('<b style="font:Bold 20px/30px Arial;padding:10px;position:absolute;left:50%;top:50%;transform:translate(-50%, -50%)">Only accepted files with the extension .swf!</b>');
								$('#emulators-file-upload button[type="submit"]').prop('disabled', true);
							}
					});
					$('input[name="emulators"]').click(function(){
						var emulator = $(this).val();
							if(emulator && _this.uploadPathRecently != ''){
								$('#playing').html('<iframe src="'+ _this.uploadPathRecently + '&emulator='+ emulator + '" width="100%" height="100%"></iframe>');
							}
					});
					$('#emulators-file-upload').submit(function(e) {
						e.preventDefault();
						$('#choose-file').val( _this.targetFile );
						var formData = new FormData(this);
							$('#playing').html('<b style="font:Bold 20px/30px Arial;padding:10px;position:absolute;left:50%;top:50%;transform:translate(-50%, -50%)">Uploading...</b>');
							/* Setup ajax */						
							$.ajaxSetup({
								headers: {
								'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
								}
							});
							$.ajax({
								type:'POST',
								url: settings.baseUrl + 'upload/emulators',
								data: formData,
								cache:false,
								contentType: false,
								processData: false,
								success: (data) => {
									this.reset();
									if(data.file != undefined){
										var emulator = $('input[name=emulators]:checked').val();
											_this.uploadPathRecently = settings.baseUrl + 'embed/test/?file=' +data.file;
											$('#playing').html('<iframe src="'+ _this.uploadPathRecently + '&emulator='+ emulator + '" width="100%" height="100%"></iframe>');
									}
									console.log('File has been uploaded successfully');
									console.log(data);
									$('#choose-file').val( _this.targetFile );
								},
								error: function(data){
									console.log(data);
								}
							});				
						return false;
					});
					var adHeight = $('.emulator-ad-content').height();
						if(adHeight >= 600){
							$.get(settings.baseUrl + 'ads/unit/300x600', {}, function(result){
								$('.emulator-ad-content').html(result);
							});
						}else{
							$.get(settings.baseUrl + 'ads/unit/300x250', {}, function(result){
								$('.emulator-ad-content').html(result);
							});
						}
			}
		};
	}
};

$(document).ready(function(){
	App.init();
});

$(window).resize(function(){
	/*App.fitLargeContent(true);*/
	App.slide().gripContent(true);
});