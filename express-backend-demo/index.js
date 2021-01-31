const express= require ('express')
const app = express()
const cors = require('cors')
const bodyParser = require ('body-parser')

app.use(cors())

app.get('/', (req, res)=>{
    res.send('hello')
})

const PORT = process.env.PORT || 8000
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})