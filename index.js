body = document.body

function tf(es) {
    console.log(es)
    body.innerHTML += es + "<br>"
}

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

try {
    var imageEl

    const image = new Image
    image.src = 'qr.png'
    image.onload = () => {
        ctx.drawImage(image, 0, 0)
        imageData = ctx.getImageData(0, 0, image.width, image.height)
        tf(imageData)
        imageEl = new ImageData(imageData,)
    }
    tf("imgae")
    tf(imageEl)
} catch (err) {
    tf(err)
}


try {
    const barcodeDetector = new BarcodeDetector({
        formats: ["code_39", "codabar", "ean_13"],
    })

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
} catch (err) {
    tf(err)
}