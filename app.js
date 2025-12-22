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
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if(!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only images allowed"))
        }
        cb(null, true)
    }
})

const path = require('path')

//ROTAS

app.use(express.json())

app.use(express.static('public'))

app.get('/all-images', async (req, res) => {
    try {
        const files = await fs.readdir(dirPath)
        const filesPaths = files.map(file => `files/${file}`)
        res.status(200).json({paths: filesPaths})
    } catch (err) {
        console.error('Error getting images', err)
        res.status(500).json({message: `Error getting images. ${err}`})
    }
})

app.post('/upload-file', upload.single("file"), (req, res) => {
    if(!req.file){
        return res.status(400).json({message: "No file uploaded!"})
    }
    console.log(req.file.originalname)
    res.status(201).json({message: 'Received request!', user: req.body})
})

app.delete('/delete-file/:imageName', async (req, res) => {
    try {
        const imageName = req.params.imageName
        const fullPath = path.join(dirPath, imageName)
        await fs.unlink(fullPath)
        console.log(`Image ${imageName} removed!`)
        res.status(200).json({message: `Image ${imageName} removed!`})
    } catch (err) {
        console.error("Error deleting file: ", err)
        res.status(500).json({message: `Error trying to remove image!`})
    }
})

app.use((req, res) => {
    res.status(404).send(`
        <h1 style='color: red'>You shouldn't be seeing this!</h1>
        `)
})

app.listen(port, () => {
    console.log('Server listening at http://localhost:', port)
})