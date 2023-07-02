body = document.body

function tf(es) {
    console.log(es)
    body.innerHTML += es + "<br>"
}

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

var imageEl

try {

    const image = new Image
    image.src = 'qr.png'
    ctx.drawImage(image, 0, 0)
    imageData = ctx.getImageData(0, 0, image.width, image.height)
    tf("daata")
    tf(imageData)
    imageEl = new ImageData(imageData, image.width, image.height)
    tf("imgae")
    tf(imageEl)
} catch (err) {
    tf(err)
}


try {
    const barcodeDetector = new BarcodeDetector({
        formats: ["code_39", "codabar", "ean_13"],
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