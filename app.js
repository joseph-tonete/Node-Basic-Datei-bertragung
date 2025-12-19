const express = require('express')
const app = express()
const port = 1000

const fs = require('fs')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "files/")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage})

app.use(express.json())

app.get('/images', (req, res) => {
    
})

app.get('/', (req, res) => {
    fs.readFile('public/index.html', 'utf-8', (err,data) => {
        if (err) {
            console.error('Error reading file: ', err)
            return
        }
        res.send(data)
    })
})

app.post('/upload-file', upload.single("file"), (req, res) => {
    console.log(req.file.originalname)
    console.log(req.body)
    res.status(201).json({message: 'Received request!', user: req.body})
})

app.delete('/delete-file', (req, res) => {
    console.log(req.body)
    res.status(201).json({message: 'Received request!', user: req.body})
})

app.use((req, res) => {
    res.status(404).send(`
        <h1 style='color: red'>You shouldn't be seeing this!</h1>
        `)
})

app.listen(port, () => {
    console.log('Server listening at http://localhost:', port)
})