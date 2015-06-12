/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

/*********************************************************************************/
/* auto escala el pedal al tamaño del movil . SOLO ENVERTICAL*/
var aspectRatio = calculate_ratio();
var res = aspectRatio.indexOf(":");
var ratioW = aspectRatio.substring(0, res);
var ratioH = aspectRatio.substring(res+1);


/* tamaño inicial pedal */
//var iniX = document.getElementById('pedal').height;
var widthIni = document.getElementById('pedal').width;
var widthFin = document.getElementById('pedal').width;

var w = window.innerWidth - 10;
var h = window.innerHeight - 10;

/* Tamanyo Pedal Resize */
var sWidth = w ; //screen.width;
var sHeight = h; //screen.height;
document.getElementById('pedal').height = sHeight;
document.getElementById('pedal').width = sWidth;

/* Tamanyo boton On/off */
var btnOfOff_X = document.getElementById('btnExit').width;
var btnOfOff_Y = document.getElementById('btnExit').height;

var sWidth = w ; //screen.width;
var sHeight = h; //screen.height;
document.getElementById('btnExit').height = sHeight - (sHeight / 2); //btnOfOff_Y * (ratioW/ratioH);
document.getElementById('btnExit').width = sWidth;

/* Posicionar boton On/off */
//var topbtnExit = sHeight - document.getElementById('btnExit').height;
var topbtnExit = sHeight - document.getElementById('btnExit').height;
document.getElementById('divOnOff').style.top = topbtnExit + "px";

/*********************************************************************************/



/**********************************************************************/
/******************* T A M A N Y O   N O T A  *************************/

/* Tamanyo boton On/off */
var btnNota_X = document.getElementById('note').width;
var btnnota_Y = document.getElementById('note').height;
document.getElementById('note').height = sHeight - (sHeight / 2); //btnOfOff_Y * (ratioW/ratioH);
document.getElementById('note').width = sWidth;


/**********************************************************************/



/* Inicializr variables globales */
var onOFF_v = '0';
var startTime, endTime, touchTime;


/**********************************************************************/
/*********************** F U N C I O N E S ****************************/



/**********************************************************************/











/**********************************************************************/
/*************************** ON OFF - INI *****************************/
function onOff() {


    switch(onOFF_v) {
        case '0':
            onOFF_v = '2';
            document.getElementById('note').src="img/A.png";
            document.getElementById('divNote').style.visibility = 'visible';
            //captureAudio();
            break;
        case '1':
            onOFF_v = '0';
            document.getElementById('divNote').style.visibility = 'hidden';
            break;

        case '2':
            onOFF_v = '0';
            document.getElementById('note').src="img/A1.png";
            break;

    }

}
/*************************** ON OFF - INI ***************************/

/**********************************************************************/
/*************************** EXIT APP - INI ***************************/
/* ------------- TOUCH START -------------*/
document.getElementById('btnExit').addEventListener('touchstart',function(event) {
    startTime = new Date().getTime();
},false);

/* ------------- TOUCH END -------------*/
document.getElementById('btnExit').addEventListener('touchend',function(event) {

    endTime = new Date().getTime();

    touchTime = endTime - startTime;
    startTime = null;
    endTime = null;

    if (touchTime > 350) {
        touchTime = null;
        var r = confirm("Exit application?");
        if (r == true) {
            navigator.app.exitApp();
        }
    }
    else{
        onOff();
    }

},false);
/*************************** EXIT APP - END ***************************/


/***************************************************************************/
/*************************** CAPTURE AUDIO - INI ***************************/
/***************************************************************************/

/*
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
    navigator.device.capture.captureAudio(captureSuccess, captureError, {limit: 2});
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
*/