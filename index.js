body = document.body

function tf(es) {
    console.log(es)
    body.innerHTML += es + "<br>"
}

var imageEl = "xd"

try {
    fetch("qr.png")
        .then(function (response) {
            return response.blob()
        })
        .then(function (blob) {
            imageEl = blob
            tf("imgae")
            tf(imageEl)
        })
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