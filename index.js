body = document.body

async function imageDataFromSource(source) {
    const image = Object.assign(new Image(), { src: source });
    await new Promise(resolve => image.addEventListener('load', () => resolve()));
    const context = Object.assign(document.createElement('canvas'), {
        width: image.width,
        height: image.height
    }).getContext('2d');
    context.imageSmoothingEnabled = false;
    context.drawImage(image, 0, 0);
    return context.getImageData(0, 0, image.width, image.height);
}

function tf(es) {
    console.log(es)
    body.innerHTML += es + "<br>"
}

const imageEl = await imageDataFromSource('qr.png')

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
