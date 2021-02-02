import axios from 'axios'

export const upload=async(data)=>{
    try {
        let formData= new FormData()
        //iterates over form values and attaches them to formData
        //in express req.body
        Object.keys(data).map(key=>{
            if(typeof(data[key]!=='object')){
                formData.append(key, data[key])
            }
        })
        //iterates over the pic attachments and attaches them to formData
        //in express route, multerMiddleware.array('pic') then, extract them with req.files 
        for (let i = 0; i < data.pic.length&& i<4 ; i++) {
            formData.append('pic', data.pic[i]) 
        }
        const result= await axios.post('http://localhost:8000/upload', formData,{headers:{'content-type':'multipart/form-data'}})
        console.log(result.data[0])
    } catch (error) {
        console.log('error uploading', error)
    }
}