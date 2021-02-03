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

//multer middleware
const multerMiddleware= multer()
//to create a promise from a timeout fn. drop it anywhere as await delay(2000) or delay(2000).then...
const delay = t => new Promise(resolve=> setTimeout(resolve, t))

//upload to s3
app.post('/upload',multerMiddleware.array('pic', 2), async (req, res)=>{
        //checks files are of supported format
        let unsupported=[]
        let allowed= ['png', 'img', 'jpg', 'jpeg', 'image/jpeg', 'image/jpg', 'image/img', 'image/png']
        for(const file of req.files){
            const type = await fileType.fromBuffer(file.buffer)
            if(!type){
                unsupported.push('unsupported')
            }else{
                const {ext, mime} = type
                if(!allowed.includes(ext)|| !allowed.includes(mime)){
                    unsupported.push('unsupported')
                }
            }
        }
        if(unsupported.length!==0){
            console.log('unsupported file found')
            return
        }

//upload to s3
//     let errorArr=[]
//     let dataArr=[]
//      for(const file of req.files){
//         const params={
//             ACL:'public-read',
//             Bucket: process.env.AWS_S3_BUCKET,
//             Body: file.buffer,
//             Key: file.originalname
//         }
//         try {
//             const stored = await s3.upload(params).promise()
//             dataArr.push(stored)
//         } catch (error) {
//             errorArr.push('found an error')
//         }
//      }
//      console.log('error', errorArr)
//      console.log('data', dataArr)
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

// app.use(()=>(Error, Request, Response, NextFunction)=>{
//     if(Error instanceof multer.MulterError){
//         console.log('multer error detected at bottom')
//     }
// })

const PORT = process.env.PORT || 8000
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})