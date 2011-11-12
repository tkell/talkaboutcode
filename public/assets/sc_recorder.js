// Javscript to handle soundcloud recording
  SC.initialize({
    client_id:    "aa0146325fed3c61bc6e62357f8b3245",
    redirect_uri: "http://localhost:3000/soundcloud-callback.html" 
  });

  $("#recorderUI.reset #controlButton").live("click", function(e){
    // Disable submission until after the audio has been uploaded
  
    updateTimer(0);
    SC.record({
      start: function(){
        setRecorderUIState("recording");
      },
      progress: function(ms, avgPeak){
        updateTimer(ms);
      }
    });
    e.preventDefault();
  });

  $("#recorderUI.recording #controlButton, #recorderUI.playing #controlButton").live("click", function(e){
    setRecorderUIState("recorded");
    SC.recordStop();
    e.preventDefault();
  });

  $("#recorderUI.recorded #controlButton").live("click", function(e){
    updateTimer(0);
    setRecorderUIState("playing");
    SC.recordPlay({
      progress: function(ms){
        updateTimer(ms);
      },
      finished: function(){
        setRecorderUIState("recorded");
      }
    });
    e.preventDefault();
  });

  $("#reset").live("click", function(e){
    SC.recordStop();
    setRecorderUIState("reset");
    e.preventDefault();
  });

  $("#upload").live("click", function(e){
    // alert("We're about to upload");
    setRecorderUIState("uploading");       
   
    var upload = function(){
      $("#uploadStatus").html("Uploading...");
      SC.recordUpload({
        track: {
          title: document.getElementById("sc_url").innerHTML,
          sharing: "public"
        }
      }, function(track){
            // Enable form submission!
            document.getElementsByName('commit')[0].disabled = false;
        	$("#uploadStatus").html("Uploaded: <a href='" + track.permalink_url + "'>" + track.permalink_url + "</a>");
      });
    }

    // The oauth token for talkaboutcode has been hacked in to my local sdk.js.  Yes, really.  I apologize.
    if(SC.isConnected()){
      upload();
    }else{
      upload();
    }

    e.preventDefault();
  });

  function updateTimer(ms){
    $("#timer").text(SC.Helper.millisecondsToHMS(ms));
  }

  function setRecorderUIState(state){
    // state can be reset, recording, recorded, playing, uploading
    // visibility of buttons is managed via CSS
    $("#recorderUI").attr("class", state);
  }

