jQuery(document).ready(
function ()
{
  var playlist = [{
            artist: '',
            title:'DJWerd(Bangin_Cutout)',
            mp3: 'https://wilkinsonwilkinsonwilkinson.on.drv.tw/music/djwerd(bangin_cutout).mp3'
        }, {
            artist: '',
            title: 'Frida-Theres Something Going on',
            mp3: 'https://wilkinsonwilkinsonwilkinson.on.drv.tw/music/fridaiknowtheressomethinggoingon.mp3'
		}, { 
			 artist: '',
            title:'SunshineLiveSets_1',
            mp3: 'https://wilkinsonwilkinsonwilkinson.on.drv.tw/music/sunshineliveradiotwitchgooglechrome2022.mp3'
        }, {
            artist: '',
            title:"Stranger Things Remix",
            mp3: 'https://wilkinsonwilkinsonwilkinson.on.drv.tw/music/strangerthingsremix.mp3'
		}, {
			artist: '',
            title:'DJWerd Teenage Dream',
            mp3: 'https://wilkinsonwilkinsonwilkinson.on.drv.tw/music/djwerdthinkimpretty.mp3'
        }, {
            artist: '',
            title: 'DJWerd Dont Stop',
            mp3: 'https://wilkinsonwilkinsonwilkinson.on.drv.tw/music/djwerddontstop.mp3'
		}, { 
			 artist: '',
            title: 'Sunset Bros Im Feeling it (In The Air)',
            mp3: 'https://wilkinsonwilkinsonwilkinson.on.drv.tw/music/sunsetbrosxmarkmccabe-imfeelingit[intheair](officiallyricvideo)_720p.mp3'
        }, {
			 artist: '',
            title: 'Cher Turn Back Time',
            mp3: 'https://wilkinsonwilkinsonwilkinson.on.drv.tw/music/cherturnbacktime.mp3'
		}, {
            artist: '',
            title: 'Elton John-Im Still Standing',
            mp3: 'https://wilkinsonwilkinsonwilkinson.on.drv.tw/music/imstillstanding.mp3'
		}, {
			artist: '',
            title:'Harry Belafonte Jump In The Line',
            mp3: 'https://wilkinsonwilkinsonwilkinson.on.drv.tw/music/harrybelafontejumpintheline27.mp3'
		}, {	
			artist: '',
            title:'Calum Scott-Where Are You Now',
            mp3: 'https://wilkinsonwilkinsonwilkinson.on.drv.tw/music/lostfrequenciesftcalumscott-whereareyounow(officialvideo)_720p.mp3'
        }, {
            artist: '',
            title: 'SoundHelix-10',
            mp3: 'https://wilkinsonwilkinsonwilkinson.on.drv.tw/music/soundhelixsong10.mp3'
     }];

    $.customPlayer = new CustomHTML5Player();
    $.customPlayer.init({jplay:"#jquery_jplayer",container:"#player", playlist:playlist});
});

function CustomHTML5Player(){
}

CustomHTML5Player.prototype.constructor = CustomHTML5Player;

CustomHTML5Player.prototype.init = function(__settings__){
    var el = this;
    var container = $(__settings__.container);
    var jplayEl = $(__settings__.jplay);
    var playlist = this.playlist = __settings__.playlist;
    var currentTrack = this.currentTrack = 0;
    var numTracks = this.numTracks = playlist.length;
    el.timerMoveTitle = false;
    el.statusPlay = false;

    var player = this.player = jplayEl.jPlayer({
    ready: function () {
        // configura a faixa inicial do jPlayer
        player.jPlayer("setMedia", playlist[currentTrack]);
        // reproduzir a faixa atual. Se não quiser que o player comece a tocar automaticamente
            el.playCurrent();
    },
    ended: function() {
        // quando terminar de tocar uma música, ir para a próxima
        el.playNext();
    },
    play: function(){
    // quando começar a tocar, escrever o nome da faixa sendo executada
        el.setName();
        el.statusPlay = true;
    },
        swfPath: 'jplayer/',
        supplied: "mp3",
        cssSelectorAncestor: "",
        cssSelector: {
        play: '.player-play',
        pause: ".player-pause",
        stop: ".player-stop"
        },
        size: {
        width: "1px",
        height: "1px"
    }
    });

    $('.bt-next',container).click(function(){
        el.playNext();
        return false;
    });

    $('.bt-play',container).click(function(){
        if(el.statusPlay)
        {
            el.pause();
            clearInterval(el.timerMoveTitle);//stop title moving
        }
        else
        {
            el.playCurrent();
        }

        return false;
    });

    $('.bt-prev',container).click(function(){
        el.playPrevious();
        return false;
    });
};

CustomHTML5Player.prototype.setName = function(){
    var _this = this;
    var _title = _this.playlist[_this.currentTrack].title;
    $(".name-music-move",_this.container).width(10000);
    var _w = 0;

    $(".name-music-move",_this.container).empty();

    for(var i=0;i<5;i++)
    {
        var _item = $("<em><label>"+_title+"</label></em>");
        $(".name-music-move",_this.container).append(_item);
        _item.css("left",_w);
        _w += _item.outerWidth()+10;
    }

    $(".name-music-move",_this.container).width(_w);

    clearInterval(_this.timerMoveTitle);
    _this.timerMoveTitle = setInterval(_this.moveTitleSong, 30);

};

CustomHTML5Player.prototype.moveTitleSong = function(){
    var _this = this;
    var _item = $(".name-music-move",_this.container);
    var _cont = $('.name-music',_this.container);
    var _pos = ____getSize(_item,"left");
    var _posMove = _pos-1;
    var _posCheck = _cont.width()-_item.width();
    _item.css("left",_posMove);

    if(_posMove<=_posCheck)
    {
        _item.css("left",0);
    }

    function ____getSize (_obj,_css)
    {
        var _regExp = new RegExp("[a-z][A-Z]","g");
        return parseFloat(_obj.css(_css).replace(_regExp, ""));
    }
};

CustomHTML5Player.prototype.playCurrent = function(){
    var _this = this;
    _this.player.jPlayer("setMedia", _this.playlist[_this.currentTrack]).jPlayer("play");
    $('.bt-play',_this.container).removeClass('paused');
};

CustomHTML5Player.prototype.playNext = function(){
    var _this = this;
    _this.currentTrack = (_this.currentTrack == (_this.numTracks -1)) ? 0 : ++_this.currentTrack;
    _this.playCurrent();
};

CustomHTML5Player.prototype.playPrevious = function(){
    var _this = this;
    _this.currentTrack = (_this.currentTrack == 0) ? _this.numTracks - 1 : --_this.currentTrack;
    _this.playCurrent();
};

CustomHTML5Player.prototype.pause = function(){
    var _this = this;
    _this.player.jPlayer("pause");
    _this.statusPlay = false;
    $('.bt-play',_this.container).addClass('paused');
};