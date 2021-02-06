import React from 'react'
import { Button, Form } from 'react-bootstrap'

//a reusable button component
export const BtnComp=({label, ...rest})=>{
    return(
        <Button {...rest}>{label}</Button>
    )
}

//resusable checkbox component
export const CheckboxComp=({errProp, label, name, refProp, ...rest})=>{
    return(
        <Form.Group controlId={name}>
            <Form.Check type='checkbox' label={label} name={name} ref={refProp} />
            {errProp[name]&&<span className='error'>{errProp[name].message}</span>}
        </Form.Group>
    )
}

//a resusalbe form wrapper component
export const FormComp =({children, submitProp, ...rest})=>{
    return(
        <Form onSubmit={submitProp} {...rest}>
            {children}
        </Form>
    )
}

//a reusable inpup component
export const InputComp=({errProp, label, name, refProp, ...rest})=>{
    return(
        <Form.Group controlId={name}  >
            <Form.Label >{label}</Form.Label>
            <Form.Control name={name} ref={refProp} {...rest} />
            {errProp[name]&&<span className='error'>{errProp[name].message}</span>}
        </Form.Group>
    )
}

//reusable radio input component
export const RadioComp=({errProp, label, name, radioOptions,  refProp, ...rest})=>{
    return(
        <Form.Group controlId={name}>
             <Form.Label>{label}</Form.Label>
            {
                radioOptions.map(radio=>(
                    <Form.Check key={radio.value} type='radio' label={radio.label} name={name} ref={refProp} value={radio.value} {...rest}/>
                ))
            }
            {errProp[name]&&<span className='error'>{errProp[name].message}</span>}
        </Form.Group>
    )
}

//reusabel select input component
export const SelectComp=({errProp, label, name, selectOptions, refProp, ...rest})=>{
    return(
        <Form.Group controlId={name}>
            <Form.Label>{label}</Form.Label>
            <Form.Control as="select" name={name} ref={refProp} {...rest} >
                {
                    selectOptions.map(option=>(
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))
                }
            </Form.Control>
            {errProp[name]&&<span className='error'>{errProp[name].message}</span>}
        </Form.Group>
    )
}