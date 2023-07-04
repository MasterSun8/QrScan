const body = document.body
const img = document.createElement("img")
img.src = "qr.jpg"
img.id = "code"
body.appendChild(img)

let elem = document.querySelectorAll("img")[0]

function tf(es) {
    console.log(es)
    body.innerHTML += es + "<br>"
}

async function getImage() {
    try {
        let x = await fetch("qr.jpg")
        if (x.ok) {
            tf(x)
        } else {
            tf(x?.status)
            tf(x?.statusText)
        }
        x = await x.blob()
        return x
    } catch (err) {
        tf(err)
    }
}

try {
  tf(elem)
        let barcodeDetector = new BarcodeDetector()

        barcodeDetector
            .detect(elem)
            .then((barcodes) => {
                barcodes.forEach((barcode) => tf(barcode.rawValue))
            })
            .catch((err) => {
                tf(err)
            })
} catch (err) {
    tf(err)
}