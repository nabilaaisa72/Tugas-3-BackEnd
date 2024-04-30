const express = require('express');
const app = express();
const port = 8080;

app.get('/perpus', (req, res) => {
    res.send(`selamat malam`)
});

//params1
app.get('/perpus/:nmTempat', (req, res) => {
    const nmTempat = req.params.nmTempat;

    res.send(`Nama tempat yang dipilih : ${nmTempat} sudah tersedia`)
});

//params2
app.get('/perpus/:nmBuku/:nmTempat', (req, res) => {
    const nmTempat = req.params.nmTempat;
    const nmBuku = req.params.nmBuku;

    res.send(`Nama buku : ${nmBuku} dan Nama tempat yang dipilih : ${nmTempat} sudah tersedia`)
});

//query1
app.get('/get-by-nmTempat', (req,res) => {
    const nmTempat = req.query.nmTempat ;

    res.send(`Nama tempat yang dipilih : ${nmTempat} sudah tersedia`)
});

//query2
app.get('/tempat-buku', (req,res) => {
    const nmTempat = req.query.nmTempat ;
    const nmBuku = req.query.nmBuku;

    res.send(`Nama buku : ${nmBuku} dan Nama tempat yang dipilih : ${nmTempat} sudah tersedia`)
});

//body
app.use(express.json()),

app.post('/mahasiswa', (req,res)=>{
    const nim = req.body.nim;
    const nama = req.body.nama;
    const angkatan = req.body.angkatan;
    const prodi = req.body.prodi;

    const msg = {status:"sukses",
                    data:{"nim":nim, "nama":nama, "angkatan":angkatan, "prodi":prodi}}
    res.send(msg);
})

app.post('/', (req, res) => {
    res.send(`selamat sore`)
});

app.put('/', (req, res) => {
    res.send(`selamat siang`)
});

app.delete('/', (req, res) => {
    res.send(`selamat pagi`)
});

app.listen(port, () => {
    console.log(`Server berjalan pada localhost:${port}`)
});