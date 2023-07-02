body = document.body

function tf(es) {
    console.log(es)
    body.innerHTML += es + "<br>"
}

var imageEl = "xd"

async function getImgage(){
    try {
        fetch("qr.png")
            .then(function (response) {
                return response.blob()
            })
            .then(function (blob) {
                tf(blob)
                return blob
            })
    } catch (err) {
        tf(err)
    }
}

try {
    const barcodeDetector = new BarcodeDetector({
        formats: ["code_39", "codabar", "ean_13"],
    })

    barcodeDetector
        .detect(await getImgage())
        .then((barcodes) => {
            barcodes.forEach((barcode) => tf(barcode.rawValue))
        })
        .catch((err) => {
            tf(err)
        })
} catch (err) {
    tf(err)
}