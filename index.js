const width = 1024
const height = 1024

const body = document.body
const canvas = document.createElement("canvas")
const video = document.getElementById('video');
const context = canvas.getContext('2d');
const res = document.getElementById("res")
const select = document.getElementById("cam");
canvas.width = width
canvas.height = height
canvas.hidden = true
body.appendChild(canvas)

const constraints = {
    video: {
        deviceId: "60beaa4fe0326f872ede0479240c65a29b004c40fa7c2ff4e38247dfd69f8584",
        facingMode: "environment"
    }
}

function onChange() {
    constraints.video.deviceId = select.value
}

select.onchange = onChange;

let lastCode
let pass = true

if (!navigator.mediaDevices?.enumerateDevices) {
    console.log("enumerateDevices() not supported.");
} else {
    // List cameras and microphones.
    navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
            devices.forEach((device) => {
                if (device.kind == "videoinput") {
                    let option = document.createElement("option");
                    option.text = device.label;
                    option.value = device.deviceId;
                    select.appendChild(option);
                }
            });
        })
        .catch((err) => {
            console.error(`${err.name}: ${err.message}`);
        });
}

function tf(es = "") {
    console.log(es)
    res.innerHTML = "Result: " + es
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
    console.log(devices)
    if (devices && 'getUserMedia' in devices) {

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
        pass = false
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
                if (barcodes[0]?.rawValue) {
                    if (lastCode != barcodes[0]?.rawValue) {
                        lastCode = barcodes[0]?.rawValue
                        tf(lastCode)
                    }
                }
            })
            .catch((err) => {
                tf(err)
            })
    } catch (err) {
        console.error(err)
    }
}

if (pass) {
    var intervalId = window.setInterval(function () {
        getBarcode()
    }, 1000);
}