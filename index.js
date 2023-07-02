body = document.body
const imageEl = new Image(100, 200);
imageEl.src = "qr.png";

function tf(es) {
    console.log(es)
    body.innerHTML += es + "<br>"
}

tf(imageEl)

// create new detector
const barcodeDetector = new BarcodeDetector({
    formats: ["code_39", "codabar", "ean_13"],
})
// check compatibility
if (barcodeDetector) {
    tf("Barcode Detector supported!")
} else {
    tf("Barcode Detector is not supported by this browser.")
}

// check supported types
BarcodeDetector.getSupportedFormats().then((supportedFormats) => {
    supportedFormats.forEach((format) => tf(format))
})

barcodeDetector
    .detect(imageEl)
    .then((barcodes) => {
        barcodes.forEach((barcode) => tf(barcode.rawValue))
    })
    .catch((err) => {
        tf(err)
    })
