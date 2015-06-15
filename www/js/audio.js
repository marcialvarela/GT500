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
     navigator.device.capture.captureAudio(captureSuccess, captureError, {limit: 1});
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

var myFileName = "notestring.wav";
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
