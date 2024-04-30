const Express = require('express')
const Mysql = require('mysql2')
const app = Express()
const PORT = 5000

app.use(Express.json())

//config mysql
const db = Mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'nabila1208',
    database : 'kuliah'
})

//connect to mysql
db.connect((err) => {
    if(err) {
        console.log (err)
    }
    console.log('Mysql connected')
})

app.get('/', (req,res) => {
    db.query('SELECT * FROM mahasiswa', (err, result) => {
        if (err) {
            console.log (err)
        }
        res.send(result)
        if (result.affectedRows === 0){
            return res.send("Data not found");
        }
    })
})

app.get("/:nim", (req,res) => {
    const {nim} = req.params;
    db.query('SELECT * FROM mahasiswa WHERE nim = ?', nim, (err,result) => {
        if (err) {
            console.log (err)
        }
        if (result.affectedRows === 0){
            return res.send("Data not found");
        }
        res.send(result)
    })
})

app.post('/add', (req,res) => {
    const {nim, nama, angkatan, prodi} = req.body;
    db.query(
        "INSERT INTO mahasiswa (nim,nama,angkatan,prodi) VALUES (?, ?, ?, ?)",
        [nim,nama,angkatan,prodi],
        (err,result) => {
            if (err) {
                console.log (err)
            }
            if (result.affectedRows === 0){
                return res.send("Data not found");
            }
            res.send("Data added");
        }
    )
})

app.put('/update/:nim', (req,res) => {
    const {nim} = req.params;
    const {nama,angkatan,prodi} =req.body;

    db.query(
        "UPDATE mahasiswa SET nama=?, angkatan=?, prodi=? WHERE nim=?",
        [nama,angkatan,prodi,nim],
        (err,result) => {
            if (err) {
                console.log (err)
            }
            if (result.affectedRows === 0){
                return res.send("Data not found");
            }
            res.send("Data updated");
        }
    )
})

app.put('/update', (req,res) => {
    const {nim} = req.query;
    const {nama,angkatan,prodi} =req.body;

    db.query(
        "UPDATE mahasiswa SET nama=?, angkatan=?, prodi=? WHERE nim=?",
        [nama,angkatan,prodi,nim],
        (err,result) => {
            if (err) {
                console.log (err)
            }
            if (result.affectedRows === 0){
                return res.send("Data not found");
            }
            res.send("Data updated");
        }
    )
})

app.delete('/delete/:nim', (req,res) => {
    const {nim} = req.params;

    db.query('DELETE from mahasiswa WHERE nim=?', nim, (err,result) => {
        if (err) {
            console.log (err)
        }
        if (result.affectedRows === 0){
            return res.send("Data not found");
        }
        res.send("Data deleted");
    })
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))


