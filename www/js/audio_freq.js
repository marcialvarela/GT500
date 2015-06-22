/**
 * Created by mvarela on 17/06/2015.
 */

/* EXTRAIDO de la web : http://www.smartjava.org/content/exploring-html5-web-audio-visualizing-sound
* https://github.com/josdirksen/smartjava/tree/master/webaudio
*
* */

if (! window.AudioContext) {
    if (! window.webkitAudioContext) {
        alert('no audiocontext found');
    }
    window.AudioContext = window.webkitAudioContext;
}
//var context = new AudioContext();
var context = new (window.AudioContext || window.webkitAudioContext)();

var audioBuffer;
var sourceNode;


// load the sound
setupAudioNodes();
var myAudio = "http://supersonicabcn.bandcamp.com/track/locura-o-raz-n";
//loadSound("wagner-short.ogg");
loadSound(myAudio);

function setupAudioNodes() {
    // create a buffer source node
    sourceNode = context.createBufferSource();
    // and connect to destination
    sourceNode.connect(context.destination);
}

// load the specified sound
function loadSound(url) {

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.responseType = 'arraybuffer';

    // When loaded decode the data
    request.onload = function() {
        // decode the data
        context.decodeAudioData(request.response, function(buffer) {
            // when the audio is decoded play the sound
            playSound(buffer);
        }, onError);
    }
    request.send();
}


function playSound(buffer) {
    sourceNode.buffer = buffer;
    sourceNode.start(0);
}

// log if an error occurs
function onError(e) {
    alert('Error: ' + e);
}