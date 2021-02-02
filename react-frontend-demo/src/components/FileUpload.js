import React from 'react'
import {useForm} from 'react-hook-form'
import {FormComp, InputComp, BtnComp} from './reusableFormComponents'
import {upload} from '../api/axios'

const FileUpload = () => {
    const {register, handleSubmit, errors} = useForm()
    const submitForm=async (value)=>{
        console.log(value)
        const result= await upload(value)
    }
    return (
        <FormComp className='text-white border border rounded p-4' submitProp={handleSubmit(submitForm)}>
            <InputComp className='col-lg-6' type={'text'} errProp={errors} name={'username'} label={'Username :'} refProp={register}/>
            <InputComp className='col-lg-6' type={'password'} errProp={errors} name={'password'} label={'Password :'} refProp={register}/>
            <InputComp multiple type={'file'} errProp={errors} name={'pic'} label={'Attach a file :'} refProp={register}/>
            <BtnComp label={'upload'} type={'submit'}/>
        </FormComp>
    )
}

export default FileUpload
