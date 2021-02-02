const express= require ('express')
const app = express()
const cors = require('cors')
const bodyParser = require ('body-parser')
const fileType= require('file-type')
const multer= require('multer')
const AWS= require('aws-sdk')
const multerS3= require('multer-s3')
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.send('hello')
})

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
})


const multerMiddlwrare= multer()
//upload to s3
app.post('/upload', multerMiddlwrare.single('pic'), async (req, res)=>{
   // console.log('username', req.body)
   // console.log(' files', req.file.buffer)
    const type =  await fileType.fromBuffer(req.file.buffer)
    if(!type) {
        console.log('unsupported file')
        return
    }
    const {ext, mime} = type
    console.log(ext, mime)
    const params = {
        ACL:'public-read',
        Bucket: process.env.AWS_S3_BUCKET,
        Body: req.file.buffer,
        Key: `${req.file.originalname}`
    }
    s3.upload(params, (error, data)=>{
        if(error){
            console.log('s3 error', error)
            return
        }
        if(data){
            console.log('data from s3', data)
        }
    })
})

//delete from s3 using key
app.delete('/delete/:key', (req, res)=>{
    const key = req.params.key
    console.log(key)
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key
    }
    s3.deleteObject(params, (error, data)=>{
        if(error){
            console.log('s3 delete error', error)
            return
        }
        if(data){
            console.log('success data from s3 delete', data)
        }
    })
})

const PORT = process.env.PORT || 8000
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})