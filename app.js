// IMPORTAÇÕES
const express = require('express')
const app = express()
const port = 1000

const fs = require('fs').promises


const dirPath = 'public/files/'
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dirPath)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage})

const path = require('path')

//ROTAS

app.use(express.json())

app.use(express.static('public'))

app.get('/all-images', async (req, res) => {
    try {
        let filesPaths = []
        const files = await fs.readdir(dirPath)
        files.forEach((file) => {
            let fullFilePath = "files/" + file
            filesPaths.push(fullFilePath)
        })
        res.json({paths: filesPaths})
    } catch (err) {
        console.error('Error getting images', err)
    }
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