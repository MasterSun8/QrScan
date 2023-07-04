const width = 300
const height = 300

const body = document.body
const canvas = document.createElement("canvas")
canvas.width = 300
canvas.height = 300
body.appendChild(canvas)
const context = canvas.getContext('2d');

function tf(es = "") {
    console.log(es)
    body.innerHTML += es + "<br>"
}

function playStream(stream) {
    var video = document.createElement('video');
    video.addEventListener('loadedmetadata', function () {
        var drawFrame = function () {
            context.drawImage(video, 0, 0);
            window.requestAnimationFrame(drawFrame);
        };
        drawFrame();
    });
    video.autoplay = true;
    video.srcObject = stream;
}

function playCamera() {
    var devices = navigator.mediaDevices;
    tf(devices)
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

/*
const img = document.createElement("img")
img.src = "qrTest.jpg"
img.id = "code"
body.appendChild(img)
*/

function getBarcode() {
    try {
        let barcodeDetector = new BarcodeDetector()

        barcodeDetector
            .detect(canvas)
            .then((barcodes) => {
                barcodes.forEach((barcode) => tf(barcode.rawValue))
            })
            .catch((err) => {
                tf(err)
            })
    } catch (err) {
        tf(err)
    }
}
