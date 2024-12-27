function Hewan(nama) {
    this.nama = nama

    this.suara = function() {
        return `${this.nama} bersuara ${this.suaranya}`
    }
}

Hewan.prototype.makanan = "makanan"

var Hewan1 = new Hewan("Kucing")
Hewan1.suaranya = "miaw"
Hewan1.makanan = "ikan"
console.log(Hewan1.makanan)
console.log(Hewan1.suara())

var Hewan2 = new Hewan("Sapi")
Hewan2.suaranya = "emoh"
Hewan2.makanan = "rumput"
console.log(Hewan2.makanan)
console.log(Hewan2.suara())

var Hewan3 = new Hewan("Ayam")
Hewan3.suaranya = "pekpekpekok"
Hewan3.makanan = "biji-bijian"
console.log(Hewan3.makanan)
console.log(Hewan3.suara())



