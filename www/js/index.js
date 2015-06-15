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
var topbtnExit = sHeight - document.getElementById('btnExit').height;
document.getElementById('divOnOff').style.top = topbtnExit + "px";

/*********************************************************************************/



/**********************************************************************/
/******************* T A M A N Y O   N O T A  *************************/

/* Tamanyo boton On/off */
document.getElementById('note').height = sHeight - (sHeight / 2); //btnOfOff_Y * (ratioW/ratioH);
document.getElementById('note').width = sWidth;
/**********************************************************************/


/**********************************************************************/
/******************* T A M A N Y O   P I T C H   **********************/

/* Tamanyo boton On/off */
document.getElementById('pitchL').height = sHeight - (sHeight / 2);
document.getElementById('pitchL').width = sWidth;
document.getElementById('pitchR').height = sHeight - (sHeight / 2);
document.getElementById('pitchR').width = sWidth;

/**********************************************************************/



/* Inicializr variables globales */
var onOFF_v = '0';
var startTime, endTime, touchTime;


/**********************************************************************/
/*********************** F U N C I O N E S ****************************/



/**********************************************************************/






window.addEventListener("audiofrequency", onAudiofrequency, false);

function onAudiofrequency(e) {
    alert('Entra en onAudiofrequency');
    //console.log("Frequency: " + e.frequency + " Hz");
    alert("Frequency: " + e.frequency + " Hz");
}





/**********************************************************************/
/*************************** ON OFF - INI *****************************/
function onOff() {


    switch(onOFF_v) {
        case '0':
            onOFF_v = '1';
            //document.getElementById('note').src="img/A.png";
            document.getElementById('divNote').style.visibility = 'visible';
            document.getElementById('pitchL').style.visibility = 'visible';
            document.getElementById('pitchR').style.visibility = 'visible';
            //captureAudio();
            break;
        case '1':
            onOFF_v = '0';
            document.getElementById('divNote').style.visibility = 'hidden';
            document.getElementById('pitchL').style.visibility = 'hidden';
            document.getElementById('pitchR').style.visibility = 'hidden';
            break;

    }

}
/*************************** ON OFF - INI ***************************/

/**********************************************************************/
/*************************** EXIT APP - INI ***************************/
/* ------------- S L E E P  -------------*/
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}
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
        document.getElementById('note').style.visibility = 'hidden';
        document.getElementById('pitchR').style.visibility = 'hidden';
        document.getElementById('pitchL').style.visibility = 'hidden';
        document.getElementById('note').src = 'img/off.png';
        document.getElementById('note').style.visibility = 'visible';
        setInterval('parpadeo()', 500);
    }
    else{
        onOff();
    }

},false);


function p_off(){
    document.getElementById('note').style.visibility = 'hidden';
    document.getElementById('note').src = 'img/off.png';
    document.getElementById('note').style.visibility = 'visible';

    setInterval('parpadeo()', 500);
}

var iInterval = 0;
function parpadeo() {
    if(document.getElementById('note').style.visibility == 'visible'){
        document.getElementById('note').style.visibility='hidden';
    }
    else{
        document.getElementById('note').style.visibility='visible';
    }

    iInterval++;
    if (iInterval == 5){
        navigator.app.exitApp();
    }

}


/*************************** EXIT APP - END ***************************/



