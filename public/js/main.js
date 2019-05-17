
  var allMusiques = $("#ytplayerMusiques").data('all');
  var allDiscours = $("#ytplayerDiscours").data('all');

  function onPlayerReadyMusiques(event) {
        startTimeCodeVolume(event,$("#ytplayerMusiques").data('id'),'musique');
  }

  function onPlayerReadyDiscours(event) {
        startTimeCodeVolume(event,$("#ytplayerDiscours").data('id'),'discours');
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
          alert("musique stop");
        }
      }

  function onPlayerStateChangeDiscours(event) {
        if (event.data === 0) {
          alert("discours stop");
        }
      }
