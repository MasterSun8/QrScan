body = document.body

function tf(es) {
    console.log(es)
    body.innerHTML += es + "<br>"
}

var imageEl

try {
    var img = new Image;
    var c = document.createElement("canvas")
    var ctx = c.getContext("2d")

    img.onload = function () {
        c.width = this.naturalWidth     // update canvas size to match image
        c.height = this.naturalHeight
        ctx.drawImage(this, 0, 0)       // draw in image
        c.toBlob(function (blob) {        // get content as JPEG blob
            imageEl = blob
        }, "image/png", 0.75)
    };
    img.crossOrigin = ""              // if from different origin
    img.src = "qr.png"

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