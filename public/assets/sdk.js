var __hasProp=Object.prototype.hasOwnProperty,__bind=function(a,b){return function(){return a.apply(b,arguments)}};
window.SC||(window.SC={_version:"1.0.5",options:{site:"soundcloud.com"},connectCallbacks:{},_popupWindow:void 0,initialize:function(a){var b,c,d;a==null&&(a={});this.accessToken(a.access_token);for(b in a)__hasProp.call(a,b)&&(c=a[b],this.options[b]=c);(d=this.options).flashXHR||(d.flashXHR=(new XMLHttpRequest).withCredentials===void 0);return this},hostname:function(a){var b;b="";a!=null&&(b+=a+".");b+=this.options.site;return b},connect:function(a){var b,a=typeof a==="function"?{connected:a}:a;
a.client_id||(a.client_id=SC.options.client_id);a.redirect_uri||(a.redirect_uri=SC.options.redirect_uri);SC.connectCallbacks.success=a.connected;SC.connectCallbacks.error=a.error;SC.connectCallbacks.general=a.callback;if(a.client_id&&a.redirect_uri)return b=new SC.URI("https://"+this.hostname()+"/connect/?"),b.query={client_id:a.client_id,redirect_uri:a.redirect_uri,response_type:"code_and_token",scope:a.scope||"non-expiring",display:"popup"},SC._popupWindow=SC.Helper.openCenteredPopup(b.toString(),
456,510);else throw"Either client_id and redirect_uri (for user agent flow) must be passed as an option";},connectCallback:function(){var a,b,c;b=SC._popupWindow;c=new SC.URI(b.location.toString(),{decodeQuery:!0,decodeFragment:!0});a=c.query.error||c.fragment.error;b.close();if(a)throw Error("SC OAuth2 Error: "+c.query.error_description);else SC.accessToken(c.fragment.access_token),SC._trigger("success");return SC._trigger("general",a)},disconnect:function(){return this.accessToken(null)},_trigger:function(a,
b){if(this.connectCallbacks[a]!=null)return this.connectCallbacks[a](b)},accessToken:function(a){var b;b=this.storage();return a===void 0?b.getItem("SC.accessToken"):a===null?b.removeItem("SC.accessToken"):b.setItem("SC.accessToken",a)},isConnected:function(){return this.accessToken()!=null},whenStreamingReady:function(a){var b;return window.soundManager?a():(b="http://"+this.hostname("connect")+"/soundmanager2/",window.SM2_DEFER=!0,SC.Helper.loadJavascript(b+"soundmanager2.js",function(){window.soundManager=
new SoundManager;soundManager.url=b;soundManager.flashVersion=9;soundManager.useFlashBlock=!1;soundManager.useHTML5Audio=!1;soundManager.beginDelayedInit();return soundManager.onready(function(){return a()})}))},stream:function(a,b){b==null&&(b={});return SC.whenStreamingReady(function(){b.id="T"+a+"-"+Math.random();b.url="http://"+SC.hostname("api")+"/tracks/"+a+"/stream?client_id=YOUR_CLIENT_ID";return soundManager.createSound(b)})},streamStopAll:function(){if(window.soundManager!=null)return window.soundManager.stopAll()},
whenXDMReady:function(a){return window.crossdomain!=null?a():(window.CROSSDOMAINJS_PATH="http://"+this.hostname("connect")+"/crossdomain-requests-js",SC.Helper.loadJavascript(CROSSDOMAINJS_PATH+"/crossdomain-ajax.js",function(){return a()}))},request:function(a,b,c,d){var e,g,f;d==null&&(d=c,c=void 0);c||(c={});f=SC.prepareRequestURI(b,c);f.query.format="json";SC.options.flashXHR&&SC.Helper.setFlashStatusCodeMaps(f.query);if(a==="PUT"||a==="DELETE")f.query._method=a,a="POST";if(a!=="GET")e=f.encodeParams(f.query),
f.query={};g=function(a,b){var c;c=SC.Helper.responseHandler(a,b);return d(c.json,c.error)};return SC.options.flashXHR?this.whenRecordingReady(function(){return Recorder.request(a,f.toString(),e,g)}):this._request(a,f.toString(),e,g)},_request:function(a,b,c,d){var e;e=new XMLHttpRequest;e.open(a,b.toString(),!0);e.setRequestHeader("Content-Type","application/x-www-form-urlencoded");e.onreadystatechange=function(a){if(a.target.readyState===4)return d(a.target.responseText,a.target)};return e.send(c)},
post:function(a,b,c){return this.request("POST",a,b,c)},put:function(a,b,c){return this.request("PUT",a,b,c)},get:function(a,b,c){return this.request("GET",a,b,c)},"delete":function(a,b){return this.request("DELETE",a,{},b)},prepareRequestURI:function(a,b){var c,d,e;b==null&&(b={});d=new SC.URI(a,{decodeQuery:!0});for(c in b)__hasProp.call(b,c)&&(e=b[c],d.query[c]=e);if(d.isRelative())d.host=this.hostname("api"),d.scheme="http";this.accessToken()!=null?(d.query.oauth_token=this.accessToken(),d.scheme=
"https"):d.query.client_id=this.options.client_id;return d},oEmbed:function(a,b,c){var d;c==null&&(c=b,b=void 0);b||(b={});b.url=a;a=new SC.URI("http://"+SC.hostname("api")+"/oembed");a.query=b;c.nodeType!==void 0&&c.nodeType===1&&(d=c,c=__bind(function(a){return d.innerHTML=a.html},this));return SC.Helper.JSONP.get(a,c)},storage:function(){return window.localStorage||(this._fakeStorage=new SC.Helper.FakeStorage)},whenRecordingReady:function(a){return window.Recorder.flashInterface()&&window.Recorder.flashInterface().record!=
null?a():Recorder.initialize({swfSrc:"http://"+this.hostname("connect")+"/recorder.js/recorder.swf?"+SC._version,initialized:function(){return a()}})},record:function(a){a==null&&(a={});return this.whenRecordingReady(function(){return Recorder.record(a)})},recordStop:function(){return Recorder.stop()},recordPlay:function(a){a==null&&(a={});return Recorder.play(a)},recordUpload:function(a,b){var c;a==null&&(a={});c=SC.prepareRequestURI("/tracks",a);c.query.format="json";SC.Helper.setFlashStatusCodeMaps(c.query);
c=c.flattenParams(c.query);return Recorder.upload({method:"POST",url:"https://"+this.hostname("api")+"/tracks.json?oauth_token=1-12885-8716802-2cb07260d4801038",audioParam:"track[asset_data]",params:c,success:function(a){a=SC.Helper.responseHandler(a);return b(a.json,a.error)}})},Helper:{loadJavascript:function(a,b){var c;c=document.createElement("script");c.async=!0;c.src=a;SC.Helper.attachEvent(c,"load",b);document.body.appendChild(c);return c},openCenteredPopup:function(a,b,c){var d,e,b={location:1,width:b,height:c,left:window.screenX+(window.outerWidth-
b)/2,top:window.screenY+(window.outerHeight-c)/2,toolbar:"no",scrollbars:"yes"},c=[];for(d in b)__hasProp.call(b,d)&&(e=b[d],c.push(d+"="+e));return window.open(a,"connectWithSoundCloud",c.join(", "))},attachEvent:function(a,b,c){return a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener(b,c,!1)},millisecondsToHMS:function(a){var b,c,d,a={h:Math.floor(a/36E5),m:Math.floor(a/6E4%60),s:Math.floor(a/1E3%60)};d=[];a.h>0&&d.push(a.h);c=b="";a.m<10&&a.h>0&&(b="0");a.s<10&&(c="0");d.push(b+a.m);d.push(c+
a.s);return d.join(".")},setFlashStatusCodeMaps:function(a){a["_status_code_map[400]"]=200;a["_status_code_map[401]"]=200;a["_status_code_map[403]"]=200;a["_status_code_map[404]"]=200;a["_status_code_map[422]"]=200;a["_status_code_map[500]"]=200;a["_status_code_map[503]"]=200;return a["_status_code_map[504]"]=200},responseHandler:function(a,b){var c,d;d=SC.Helper.JSON.parse(a);c=null;d?d.errors&&(c={message:d.errors&&d.errors[0].error_message}):c=b?{message:"HTTP Error: "+b.status}:{message:"Unknown error"};
return{json:d,error:c}},FakeStorage:function(){return{_store:{},getItem:function(a){return this._store[a]||null},setItem:function(a,b){return this._store[a]=b.toString()},removeItem:function(){return delete this._store.key}}},JSON:{parse:function(a){return a[0]!=="{"&&a[0]!=="["?null:window.JSON!=null?window.JSON.parse(a):eval(a)}},JSONP:{callbacks:{},randomCallbackName:function(){return"CB"+parseInt(Math.random()*999999,10)},get:function(a,b){var c;c=this.randomCallbackName();a.query.format="js";
a.query.callback="SC.Helper.JSONP.callbacks."+c;SC.Helper.JSONP.callbacks[c]=b;return SC.Helper.loadJavascript(a.toString(),function(){return document.body.removeChild(this)})}}}});
var Recorder={swfCode:'<object id="Recorder" style="z-index: 200" width="231" height="141" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param value="transparent" name="wmode"><param value="RECORDER_URI" name="movie"><param value="always" name="allowScriptAccess"><embed width="231" height="141" wmode="transparent" name="Recorder" type="application/x-shockwave-flash" src="RECORDER_URI" allowscriptaccess="always">  </object>',swfObject:null,_callbacks:{},_events:{},options:{},initialize:function(a){this.options=
a=a||{};if(!a.flashContainer)a.flashContainer=document.createElement("div"),a.flashContainer.setAttribute("id","recorderFlashContainer"),a.flashContainer.setAttribute("style","position: fixed; left: -9999px; top: -9999px; width: 230px; height: 140px; margin-left: 10px; border-top: 6px solid rgba(128, 128, 128, 0.6); border-bottom: 6px solid rgba(128, 128, 128, 0.6); border-radius: 5px 5px; padding-bottom: 1px; padding-right: 1px;"),document.body.appendChild(a.flashContainer);if(!a.onFlashSecurity)a.onFlashSecurity=
function(){var a=Recorder.options.flashContainer;a.style.left=window.innerWidth/2-115+"px";a.style.top=window.innerHeight/2-70+"px"};this.bind("initialized",a.initialized);this.bind("showFlash",a.onFlashSecurity);a.flashContainer.innerHTML=this.swfCode.replace(/RECORDER_URI/g,a.swfSrc);this.swfObject=a.flashContainer.children[0]},clear:function(){Recorder._events={}},record:function(a){a=a||{};this.clearBindings("recordingStart");this.clearBindings("recordingProgress");this.bind("recordingStart",
function(){var a=Recorder.options.flashContainer;a.style.left="-9999px";a.style.top="-9999px"});this.bind("recordingStart",a.start);this.bind("recordingProgress",a.progress);this.flashInterface().record()},stop:function(){return this.flashInterface()._stop()},play:function(a){a=a||{};this.clearBindings("playingProgress");this.bind("playingProgress",a.progress);this.bind("playingStop",a.finished);this.flashInterface()._play()},upload:function(a){a.audioParam=a.audioParam||"audio";a.params=a.params||
{};this.clearBindings("uploadSuccess");this.bind("uploadSuccess",function(b){a.success(b)});this.flashInterface().upload(a.url,a.audioParam,a.params)},audioData:function(){return this.flashInterface().audioData().split(";")},request:function(a,b,d,c){c=this.registerCallback(c);this.flashInterface().request(a,b,d,c)},clearBindings:function(a){Recorder._events[a]=[]},bind:function(a,b){Recorder._events[a]||(Recorder._events[a]=[]);Recorder._events[a].push(b)},triggerEvent:function(a,b,d){for(var c in Recorder._events[a])Recorder._events[a][c](b,
d)},triggerCallback:function(a,b){Recorder._callbacks[a].apply(null,b)},registerCallback:function(a){var b="CB"+parseInt(Math.random()*999999,10);Recorder._callbacks[b]=a;return b},flashInterface:function(){if(this.swfObject)if(this.swfObject.record)return this.swfObject;else{if(this.swfObject.children[3].record)return this.swfObject.children[3]}else return null}};
var __hasProp=Object.prototype.hasOwnProperty;
window.SC.URI=function(g,h){var i,j;g==null&&(g="");h==null&&(h={});j=/^(?:([^:\/?\#]+):)?(?:\/\/([^\/?\#]*))?([^?\#]*)(?:\?([^\#]*))?(?:\#(.*))?/;i=/^(?:([^@]*)@)?([^:]*)(?::(\d*))?/;this.scheme=this.user=this.password=this.host=this.port=this.path=this.query=this.fragment=null;this.toString=function(){var a;a="";this.isAbsolute()&&(a+=this.scheme,a+="://",this.user!=null&&(a+=this.user+":"+this.password+"@"),a+=this.host,this.port!=null&&(a+=":"+this.port));a+=this.path;if(this.path===""&&(this.query!=
null||this.fragment!=null))a+="/";this.query!=null&&(a+="?"+this.encodeParams(this.query));this.fragment!=null&&(a+="#"+this.encodeParams(this.fragment));return a};this.isRelative=function(){return!this.isAbsolute()};this.isAbsolute=function(){return this.host!=null};this.decodeParams=function(a){var c,d,b,e,f;a==null&&(a="");d={};f=a.split("&");a=0;for(e=f.length;a<e;a++)c=f[a],c!==""&&(b=c.split("="),c=decodeURIComponent(b[0]),b=decodeURIComponent(b[1]||"").replace(/\+/g," "),this.normalizeParams(d,
c,b));return d};this.normalizeParams=function(a,c,d){var b,e;d==null&&(d=NULL);b=c.match(/^[\[\]]*([^\[\]]+)\]*(.*)/);c=b[1]||"";b=b[2]||"";b===""?a[c]=d:b==="[]"?(a[c]||(a[c]=[]),a[c].push(d)):(e=b.match(/^\[\]\[([^\[\]]+)\]$/)||(e=b.match(/^\[\](.+)$/)))?(b=e[1],a[c]||(a[c]=[]),e=a[c][a[c].length-1],e!=null&&e.constructor===Object&&e[b]==null?this.normalizeParams(e,b,d):a[c].push(this.normalizeParams({},b,d))):(a[c]||(a[c]={}),a[c]=this.normalizeParams(a[c],b,d));return a};this.encodeParams=function(a){var c,
d,b,e,f;if(a.constructor===String)return a;else{a=this.flattenParams(a);d=[];e=0;for(f=a.length;e<f;e++)b=a[e],c=b[0],b=b[1],b===null?d.push(c):d.push(c+"="+encodeURIComponent(b));return d.join("&")}};this.flattenParams=function(a,c,d){var b,e,f;c==null&&(c="");d==null&&(d=[]);if(a===null)c!=null&&d.push([c,null]);else if(a.constructor===Object)for(b in a)__hasProp.call(a,b)&&(f=a[b],e=c!==""?c+"["+b+"]":b,this.flattenParams(f,e,d));else if(a.constructor===Array){b=0;for(e=a.length;b<e;b++)f=a[b],
this.flattenParams(f,c+"[]",d)}else c!==""&&d.push([c,a]);return d};this.parse=function(a,c){var d,b,e,f;a==null&&(a="");c==null&&(c={});b=function(a){return a===""?null:a};e=a.match(j);this.scheme=b(e[1]);d=e[2];if(d!=null){d=d.match(i);f=b(d[1]);if(f!=null)this.user=f.split(":")[0],this.password=f.split(":")[1];this.host=b(d[2]);this.port=parseInt(d[3],10)||null}this.path=e[3];this.query=b(e[4]);if(c.decodeQuery)this.query=this.decodeParams(this.query);this.fragment=b(e[5]);if(c.decodeFragment)return this.fragment=
this.decodeParams(this.fragment)};this.parse(g,h);return this};

SC.initialize({
    client_id:    "c202b469a633a7a5b15c9e10b5272b78",
    redirect_uri: "http://connect.soundcloud.com/examples/callback.html"
  });

  $("#recorderUI.reset #controlButton").live("click", function(e){
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
    setRecorderUIState("uploading");

    var upload = function(){
      $("#uploadStatus").html("Uploading...");
      SC.recordUpload({
        track: {
          title: document.getElementById("sc_url").innerHTML,
          sharing: "public"
        }
      }, function(track){
        document.getElementsByName('commit')[1].disabled = false;
        $("#uploadStatus").html("Uploaded successfully!");
      });
    }

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
