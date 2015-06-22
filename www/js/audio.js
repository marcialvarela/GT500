/**
 * Created by mvarela on 15/06/2015.
 */

/***************************************************************************/
/*************************** CAPTURE AUDIO - INI ***************************/
/***************************************************************************/

 // Called when capture operation is finished
 //
 function captureSuccess(mediaFiles) {
     var i, len;
     for (i = 0, len = mediaFiles.length; i < len; i += 1) {
         uploadFile(mediaFiles[i]);
     }
 }

 // Called if something bad happens.
 //
 function captureError(error) {
     var msg = 'An error occurred during capture: ' + error.code;
     navigator.notification.alert(msg, null, 'Uh oh!');
 }

 // A button will call this function
 //
 function captureAudio() {
     // Launch device audio recording application,
     // allowing user to capture up to 2 audio clips
     var options = { limit: 1, duration: 5 };
     //navigator.device.capture.captureAudio(captureSuccess, captureError, {limit: 1});
     navigator.device.capture.captureAudio(captureSuccess, captureError, options);
 }

 // Upload files to server
 function uploadFile(mediaFile) {
 var ft = new FileTransfer(),
 path = mediaFile.fullPath,
 name = mediaFile.name;

 ft.upload(path,
 "http://my.domain.com/upload.php",
 function(result) {
 console.log('Upload success: ' + result.responseCode);
 console.log(result.bytesSent + ' bytes sent');
 },
 function(error) {
 console.log('Error uploading file ' + path + ': ' + error.code);
 },
 { fileName: name });
 }


/******************************************************************************************************/

var myFileName = "myfile001.wav";
var meFileRecord = null;
var recStatus = 0;

document.getElementById('recordAudio_Push').addEventListener('touchstart',function(event) {
    startTime = new Date().getTime();
    flag = false;

    recStatus=0;
    recordAudioPush();

},false);


function recordAudioPush() {
    if (recStatus == 0){
        iniRecordAudioPush();
    }
    else{
        stopRecordAudioPull();
    }
}

function RecordAudioPush() {

    if (recStatus == 0) {
        iniRecordAudioPush();
    }
    else
    {
        stopRecordAudioPull();
    }
}
function iniRecordAudioPush() {

    meFileRecord = new Media(myFileName, onSuccess('Record'), onError);
    // Record audio
    meFileRecord.startRecord();
    recStatus = 1;
}


function stopRecordAudioPull(){
    recStatus = 0;
    clearInterval(recInterval);
    meFileRecord.stopRecord();
    //playStatus=0;
}



/*************************** PLAY AUDIO PUSH - INI ***************************/
function gotFS(fileSystem) {
    alert('entra gotFS');
    fileSystem.root.getFile(myFileName, {create: true, exclusive: false}, gotFileEntry, onError);
}

function gotFileEntry_OLD(fileEntry) {

    alert(fileEntry);

    var fileUri = fileEntry.toURI();
    var scr = fileEntry.toURI();

    my_media = new Media(scr, onSuccess('Play'), onError);

    // Play audio
    my_media.play();

    // Update my_media position every second
    if (mediaTimer == null) {
        mediaTimer = setInterval(function() {
            // get my_media position
            my_media.getCurrentPosition(
                // success callback
                function(position) {
                    if (position > -1) {
                        var iPos = parseInt(position);
                        if (iPos < 10) {
                            setAudioPosition("0:0" + (iPos), 0);
                        }
                        else
                        {
                            setAudioPosition("0:" + (iPos), 0);
                        }
                        if (iPos==0){
                            setAudioPosition("", 0);
                            document.getElementById('playAudio_Push').src="img/play.png";
                        }
                        else{
                            document.getElementById('playAudio_Push').src="img/stop.png";
                        }
                    }
                },
                // error callback
                function(e) {
                    console.log("Error getting pos=" + e);
                    setAudioPosition("Error: " + e, 1);
                }
            );
        }, setInt * 100);
    }
}

function gotFileEntry(fileEntry) {

    alert(fileEntry);

    var fileUri = fileEntry.toURI();
    var scr = fileEntry.toURI();

    my_media = new Media(scr, onSuccess('Play'), onError);

    // Play audio
    my_media.play();

}

function iniPlayAudio(){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, onError);
    //fileSystem.root.getFile(myFileName, {create: true, exclusive: false}, gotFileEntry(), onError);
    fileSystem.root.getFile(myFileName, {create: true, exclusive: false}, gotFileEntry(), onError);
}

function stopAudio() {
    clearInterval(recInterval);
    my_media.stop();
    //document.getElementById('playAudio_Push').src="img/play.png";
}
/*************************** PLAY AUDIO PUSH - END ***************************/
/*****************************************************************************/

function onSuccess(action) {
    console.log(action + " :Audio Success");
}

function onError(error) {
    if (error >0){
        alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
    }
}



//var myaudio = new Audio('/android_asset/www/audio/Ikhlas.mp3');
//var myaudio = new Media('/android_asset/www/audio/audio1.mp3');
//var myaudio = new Media('audio/audio1.mp3');

function playAudio(url) {
    url = 'http://audio.ibeat.org/content/p1rj1s/p1rj1s_-_rockGuitar.mp3';
    // Play the audio file at url
    var my_media = new Media(url,
        // success callback
        function () {
            alert("playAudio():Audio Success");
        },
        // error callback
        function (err) {
            alert("playAudio():Audio Error: " + err);
        }
    );
    // Play audio
    my_media.play();
}

function playStream() {
    try {
        myaudio.id = 'playerMyAdio';
        myaudio.play();
    } catch (e) {
        alert('no audio support!');
    }
}


function stopStream() {
    try {
        myaudio.pause();
    } catch (e) {
        alert('no audio support!');
    }
}

