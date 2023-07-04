const body = document.body
const canvas = document.createElement("canvas")
canvas.width = 300
canvas.height = 300
body.appendChild(canvas)

function tf(es = ""){
    console.log(es)
    body.innerHTML += es + "<br>"
}

function playStream(canvas, stream) {
    var video = document.createElement('video');
    video.addEventListener('loadedmetadata', function() {
        const context = canvas.getContext('2d');
        var drawFrame = function() {
            context.drawImage(video, 0, 0);
            window.requestAnimationFrame(drawFrame);
        };
        drawFrame();
    });
    video.autoplay = true;
    video.srcObject = stream;
}

function playCamera(canvas, preferedWidth, preferedHeight) {
    var devices = navigator.mediaDevices;
    if (devices && 'getUserMedia' in devices) {
        var constraints = {
            video: {
                width: preferedWidth,
                height: preferedHeight
            }
        }
        var promise = devices.getUserMedia(constraints);
        promise
            .then(function(stream) {
                playStream(canvas, stream);
            })
            .catch(function(error) {
                console.error(error.name + ': ' + error.message);
            });
    } else {
        console.error('Camera API is not supported.');
    }
}

playCamera(canvas, canvas.width, canvas.height);

/*
const img = document.createElement("img")
img.src = "qrTest.jpg"
img.id = "code"
body.appendChild(img)
*/

function getBarcode(){

    let elem = canvas.toBlob()

    try {
        let barcodeDetector = new BarcodeDetector()

        barcodeDetector
            .detect(elem)
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
*/