import React from 'react'
import {useForm } from 'react-hook-form'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { Container } from 'react-bootstrap'
import {BtnComp, CheckboxComp, FormComp, InputComp, RadioComp, SelectComp} from './reusableFormComponents'
import {upload} from '../api/axios'

//values for radio input
const radioOptions=[
    {label:'a phone call', value:'phone'},
    {label:'email me', value:'email'},
    {label:'send me mail', value:'mail'}
]
//values for select input
const selectOptions=[
    {label:'', value:''},
    {label:'Male', value:'male'},
    {label:'Female', value:'female'},
    {label:'Rather not say', value:'none'}
]
//Yup validation items
const maxFileSize= 1000000
const supportedFileTypes= ['image/jpg', 'image/png', 'image/jpeg']
const checkFileSize=(data)=>{
    const picData= Array.from(data)
    const result = picData.filter(pic=> pic.size>maxFileSize )
    if(result.length===0) return true
    else return false
}
const checkFileType=(data)=>{
    const picData= Array.from(data)
    const result = picData.filter(pic=> !supportedFileTypes.includes(pic.type))
    if(result.length===0) return true
    else return false
}
const validate= Yup.object().shape({
    username: Yup.string().required('a username is required'),
    pic: Yup.mixed()
            .test('required', 'please attach a file', value=> value.length>0)
            .test('fileSize', 'file size too large', value=> checkFileSize(value))
            .test('fileType', 'unsupported file type', value=> checkFileType(value)),
    contact: Yup.string().required('please choose a contact method'),
    gender: Yup.string().required('please choose your gender')
})

//Form
const FormReusable = () => {
    const {register, handleSubmit, errors} = useForm({
                                            mode: 'onBlur',
                                            resolver: yupResolver(validate) 
                                            })

    const submitFn=(value)=>{
        console.log(value)
        upload(value)
    }
    return (
        <div className='parentContainer formReusable'>
            <FormComp encType='multipart/form-data' submitProp={handleSubmit(submitFn)}>
                <InputComp errProp={errors} label={'User name: '} name={'username'} refProp={register} type={'text'}/>
                <RadioComp errProp={errors} label={'Contact Method: '} name={'contact'} refProp={register} radioOptions={radioOptions}/>
                <SelectComp errProp={errors} label={'Select your gender : '} name={'gender'} refProp={register} selectOptions={selectOptions}/>
                <CheckboxComp errProp={errors} label={'check if you agree'} name={'agree'} refProp={register} type={'checkbox'} />
                <InputComp errProp={errors} label={'Attach pic :'} multiple name={'pic'} refProp={register} type={'file'} />
                <BtnComp variant={'primary'} type={'submit'} label={'Submit'} />
            </FormComp>  
        </div>
    )
}

export default FormReusable