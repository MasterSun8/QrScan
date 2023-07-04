const width = 300
const height = 300

const body = document.body
const canvas = document.createElement("canvas")
const video = document.getElementById('video');
const context = canvas.getContext('2d');
const res = document.getElementById("res")
canvas.width = width
canvas.height = height
canvas.hidden = true
body.appendChild(canvas)

let lastCode

function tf(es = "") {
    console.log(es)
    res.innerHTML = "Result:<br>" + es
}

function playStream(stream) {
    video.addEventListener('loadedmetadata', function () {
        var drawFrame = function () {
            context.drawImage(video, 0, 0);
            window.requestAnimationFrame(drawFrame);
        };
        drawFrame()
    });
    video.autoplay = true;
    video.srcObject = stream;
}

function playCamera() {
    var devices = navigator.mediaDevices;
    if (devices && 'getUserMedia' in devices) {
        var constraints = {
            video: {
                width: width,
                height: height
            }
        }
        var promise = devices.getUserMedia(constraints);
        promise
            .then(function (stream) {
                __stream = stream
                playStream(stream);
            })
            .catch(function (error) {
                console.error(error.name + ': ' + error.message);
            });
    } else {
        tf('Camera API is not supported.');
    }
}

playCamera()

function getBarcode() {
    try {
        let barcodeDetector = new BarcodeDetector()

        let temp = canvas
        barcodeDetector
            .detect(temp)
            .then((barcodes) => {
                lastCode = barcodes[0]?.rawValue
                tf(lastCode)
            })
            .catch((err) => {
                tf(err)
            })
    } catch (err) {
        tf(err)
    }
}

var intervalId = window.setInterval(function(){
  getBarcode()
}, 1000);