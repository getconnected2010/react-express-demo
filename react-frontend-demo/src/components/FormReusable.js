import React from 'react'
import {useForm } from 'react-hook-form'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {BtnComp, FileComp, FormComp, InputComp, RadioComp, SelectComp} from './reusableFormComponents'
import './formreusables.scss'

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
    }
    return (
        <div className='form-input'>
            <FormComp submitProp={handleSubmit(submitFn)}>
                <InputComp errProp={errors} label={'User name: '} name={'username'} refProp={register} type={'text'}/>
                <RadioComp errProp={errors} label={'Contact Method: '} name={'contact'} refProp={register} radioOptions={radioOptions}/>
                <SelectComp errProp={errors} label={'Select your gender'} name={'gender'} refProp={register} selectOptions={selectOptions}/>
                <InputComp errProp={errors} label={'Check box item'} name={'agree'} refProp={register} type={'checkbox'} />
                <FileComp errProp={errors} label={'attach pic'} multiple name={'pic'} refProp={register} />
                <BtnComp type={'submit'} label={'Submit'} />
            </FormComp>  
        </div>
    )
}

export default FormReusable