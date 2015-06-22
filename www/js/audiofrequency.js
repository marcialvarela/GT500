/**
 * Created by mvarela on 15/06/2015.
 */

/* Aplicaction : https://github.com/Cellules/cordova-audiofrequency*/
/* https://github.com/Cellules/cordova-audiofrequency/blob/master/www/audiofrequency.js */
/*http://stackoverflow.com/questions/5511250/capturing-sound-for-analysis-and-visualizing-frequencies-in-android*/
/*
Installation
cordova plugin add com.cellules.cordova.audiofrequency
*/

alert('entra en audiofrequency.js');
var cordova = require('cordova'),
    exec = require('cordova/exec');
alert('declara var cordova');

function handlers () {
    return audiofrequency.channels.audiofrequency.numHandlers;
};

var AudioFrequency = function () {
    // Create new event handlers on the window (returns a channel instance)
    this.channels = {
        audiofrequency: cordova.addWindowEventHandler("audiofrequency")
    };
    for (var key in this.channels) {
        this.channels[key].onHasSubscribersChange = AudioFrequency.onHasSubscribersChange;
    }
};

/**
 * Event handlers for when callbacks get registered for the frequency.
 * Keep track of how many handlers we have so we can start and stop the native frequency listener appropriately.
 */
AudioFrequency.onHasSubscribersChange = function () {
    // If we just registered the first handler, make sure native listener is started.
    if (this.numHandlers === 1 && handlers() === 1) {
        exec(audiofrequency._frequency, audiofrequency._error, "AudioFrequency", "start", []);
    } else if (handlers() === 0) {
        exec(null, null, "AudioFrequency", "stop", []);
    }
};

/**
 * Callback for frequency value
 *
 * @param {Object} frequencyData     keys: frequency
 */
AudioFrequency.prototype._frequency = function (frequencyData) {
    // Fire audiofrequency event
    cordova.fireWindowEvent("audiofrequency", frequencyData);
};

/**
 * Error callback for AudioFrequency start
 */
AudioFrequency.prototype._error = function (e) {
    //console.log("Error initializing AudioFrequency: " + e);
    alert("Error initializing AudioFrequency: " + e);
};

var audiofrequency = new AudioFrequency();

module.exports = audiofrequency;


/**************************************************************************************/
