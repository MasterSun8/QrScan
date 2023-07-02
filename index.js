// create new detector
const barcodeDetector = new BarcodeDetector({
    formats: ["code_39", "codabar", "ean_13"],
})
// check compatibility
if (barcodeDetector) {
    document.write("Barcode Detector supported!")
} else {
    document.write("Barcode Detector is not supported by this browser.")
}

// check supported types
BarcodeDetector.getSupportedFormats().then((supportedFormats) => {
    supportedFormats.forEach((format) => document.write(format))
});

barcodeDetector
    .detect(imageEl)
    .then((barcodes) => {
        barcodes.forEach((barcode) => document.write(barcode.rawValue))
    })
    .catch((err) => {
        document.write(err)
    })
