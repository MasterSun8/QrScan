body = document.body

function tf(es) {
    console.log(es)
    body.innerHTML += es + "<br>"
}

var imageEl = "xd"

async function getImage() {
    try {
        let x = await fetch("qr.png")
        if (x.ok) {
            tf(x)
        } else {
            tf(x?.status)
        }
        x = await x.blob()
        return x
    } catch (err) {
        tf(err)
    }
}

try {
    let image = Promise.resolve(getImage())
    image.then(val => {
        tf(val)
        let barcodeDetector = new BarcodeDetector({
            formats: [
                "aztec",
                "code_128",
                "code_39",
                "code_93",
                "codabar",
                "data_matrix",
                "ean_13",
                "ean_8",
                "itf",
                "pdf417",
                "qr_code",
                "upc_a",
                "upc_e"
            ],
        })

        barcodeDetector
            .detect(val)
            .then((barcodes) => {
                barcodes.forEach((barcode) => tf(barcode.rawValue))
            })
            .catch((err) => {
                tf(err)
            })
    })
} catch (err) {
    tf(err)
}