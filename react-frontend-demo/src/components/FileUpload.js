import React from 'react'
import {useForm} from 'react-hook-form'
import {FormComp, InputComp, BtnComp} from './reusableFormComponents'
import {upload} from '../api/axios'
import {Container} from 'react-bootstrap'

const FileUpload = () => {
    const {register, handleSubmit, errors} = useForm()
    const submitForm=async (value)=>{
        console.log(value)
        const result= await upload(value)
    }
    return (
        <div className='parentContainer fileUpload'>
            <FormComp submitProp={handleSubmit(submitForm)}>
                <InputComp type={'text'} errProp={errors} name={'username'} label={'Username :'} refProp={register}/>
                <InputComp type={'password'} errProp={errors} name={'password'} label={'Password :'} refProp={register}/>
                <InputComp multiple type={'file'} errProp={errors} name={'pic'} label={'Attach a file :'} refProp={register}/>
                <BtnComp label={'upload'} type={'submit'}/>
            </FormComp>
        </div>
    )
}

export default FileUpload
