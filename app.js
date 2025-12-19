const express = require('express')
const app = express()
const port = 1000

app.get('/', (req, res) => {
    res.send(`
        <h1>This is the Home page!</h1>
        <p>We will be doing great things here!</p>
        `)
})

app.post('/upload-file', (req, res) => {
    console.log(req)
})

app.delete('/delete-file', (req, res) => {
    console.log(req)
})

app.use((req, res) => {
    res.status(404).send(`
        <h1 style='color: red'>You shouldn't be seeing this!</h1>
        `)
})

app.listen(port, () => {
    console.log('Server listening at http://localhost:', port)
})