body = document.body

function tf(es) {
    console.log(es)
    body.innerHTML += es + "<br>"
}

var imageEl = "xd"

async function getImage(){
    try {
        let x = await fetch("qr.png")
        x = await x.blob()
        return x
    } catch (err) {
        tf(err)
    }
}

try {
    let image = getImage()
    tf(image)
    const barcodeDetector = new BarcodeDetector({
        formats: ["code_39", "codabar", "ean_13"],
    })

    barcodeDetector
        .detect(image)
        .then((barcodes) => {
            barcodes.forEach((barcode) => tf(barcode.rawValue))
        })
        .catch((err) => {
            tf(err)
        })
} catch (err) {
    tf(err)
}