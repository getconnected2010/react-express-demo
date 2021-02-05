const express= require ('express')
const app = express()
const cors = require('cors')
const bodyParser = require ('body-parser')
const fileType= require('file-type')
const multer= require('multer')
const AWS= require('aws-sdk')
const multerS3= require('multer-s3')
require('dotenv').config()
const uuid = require('uuidv4')

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.send('hello')
})

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
})

//multer middleware
const multerMiddleware= multer()
//to create a promise from a timeout fn. drop it anywhere as await delay(2000) or delay(2000).then...
const delay = t => new Promise(resolve=> setTimeout(resolve, t))
multerMiddleware.array('pic')
//upload to s3
app.post('/upload', multerMiddleware.array('pic'), async (req, res)=>{
    const url = req.body.username
    const urlArr = url.split(/(?:\.)+/)
    const picS3Bucket = urlArr[0].split(/(?:\/)+/)[1]
    const picS3Key = urlArr[3].split(/(?:\/)+/)[1]
    const picUserId = urlArr[4]

        //check if a file is attached
        if(req.files.length===0){
            console.log('no files attached')
            return
        }
        //check max number of files attached
        if(req.files.length>4){
            console.log('maximum 4 pictures allowed')
            return
        }
        const user_id = 33
        //checks files are of supported format
        let errorArr=[]
        let allowed= ['png', 'img', 'jpg', 'jpeg', 'image/jpeg', 'image/jpg', 'image/img', 'image/png']
        for(const file of req.files){
            const type = await fileType.fromBuffer(file.buffer)
            if(!type){
                errorArr.push({msg:`${file.originalname} is not a supported type of file`})
                break
            }
            const {ext, mime} = type
            if(!allowed.includes(ext)|| !allowed.includes(mime)){
                errorArr.push({msg:`${file.originalname} is not a supported type of file`})
                break
            }
            if(file.size>1000000){
                errorArr.push({msg:`${file.originalname} exceeded max size of 2mb per pic`})
                break
            }
        }
        if(errorArr.length!==0){
            console.log('errors', errorArr)
            return
        }
     
        //upload to s3
        let dataArr=[]
        for(const file of req.files){
            const params={
                ACL:'public-read',
                Bucket: process.env.AWS_S3_BUCKET,
                Body: file.buffer,
                Key: Date.now()+'.'+user_id
            }
            try {
                const stored = await s3.upload(params).promise()
                dataArr.push(stored.Location)
            } catch (error) {
                errorArr.push({msg: 'error uploading file to db'})
            }
        }
        if(errorArr.length!==0){
            console.log('errors', errorArr)
            return
        }
        console.log('data', dataArr)
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