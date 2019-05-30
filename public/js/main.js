
  var allMusiques = $("#ytplayerMusiques").data('all');
  var allDiscours = $("#ytplayerDiscours").data('all');

  var currentMusicId = null;
  var currentDiscoursId = null;

  function onPlayerReadyMusiques(event) {
        currentMusicId = $("#ytplayerMusiques").data('id');
        startTimeCodeVolume(event,currentMusicId,'musique');
        refreshTitre();
  }

  function onPlayerReadyDiscours(event) {
        currentDiscoursId = $("#ytplayerDiscours").data('id');
        startTimeCodeVolume(event,currentDiscoursId,'discours');
        refreshTitre();
      }

  function startTimeCodeVolume(event,id,type) {
        event.target.playVideo();
        if(type == "musique"){
          event.target.setVolume(allMusiques[id][1]);
          var startTime = allMusiques[id][2];
          if(startTime){
            event.target.seekTo(startTime);
          }
        }
        if(type == "discours"){
          event.target.setVolume(allDiscours[id][1]);
          startTime = allDiscours[id][2];
          if(startTime){
            event.target.seekTo(startTime);
          }
        }
      }


  function onPlayerStateChangeMusiques(event) {
        if (event.data === 0) {
          var newObj = randomProperty(allMusiques);
          var newId = newObj[0];
          var newList = $("#ytplayerMusiques").attr('data-all');
          $('#musicContainer').remove($('#ytplayerMusiques'));
          $('#musicContainer').html('<div id="ytplayerMusiques" data-id="'+newId+'" data-all="'+newList+'" ></div>')

          playerMusiques = new YT.Player('ytplayerMusiques', {
            height: '360',
            width: '640',
            videoId: $('#ytplayerMusiques').data('id'),
            events: {
                  'onReady': onPlayerReadyMusiques,
                  'onStateChange': onPlayerStateChangeMusiques
                }
          });
        }
      }

  function onPlayerStateChangeDiscours(event) {
        if (event.data === 0) {
          var newObj = randomProperty(allDiscours);
          var newId = newObj[0];
          var newList = $("#ytplayerDiscours").attr('data-all');
          $('#discoursContainer').remove($('#ytplayerDiscours'));
          $('#discoursContainer').html('<div id="ytplayerDiscours" data-id="'+newId+'" data-all="'+newList+'" ></div>')

          playerMusiques = new YT.Player('ytplayerDiscours', {
            height: '360',
            width: '640',
            videoId: $('#ytplayerDiscours').data('id'),
            events: {
                  'onReady': onPlayerReadyDiscours,
                  'onStateChange': onPlayerStateChangeDiscours
                }
          });
        }
      }

  function refreshTitre(){
    if(typeof allDiscours[currentDiscoursId] !== 'undefined' && typeof allMusiques[currentMusicId] !== 'undefined')
    $("#titre").html("<small style='color:white;'>"+allDiscours[currentDiscoursId][3]+ "</small><br/>VS<br/><small style='color:white;'>" +allMusiques[currentMusicId][3]+"</small>");
  }

  var randomProperty = function (obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
};
