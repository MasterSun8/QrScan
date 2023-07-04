const body = document.body
const img = document.createElement("img")
img.src = "qr.jpg"
img.id = "code"
body.appendChild(img)
tf()

let elem = document.querySelectorAll("img")[0]

function tf(es = ""){
    console.log(es)
    body.innerHTML += es + "<br>"
}

window.onload = () => {
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
}