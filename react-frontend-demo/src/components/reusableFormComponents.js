import React from 'react'

//a reusable button component
export const BtnComp=({label, ...rest})=>{
    return(
        <button {...rest}>{label}</button>
    )
}

//a reusable file upload input component
export const FileComp=({errProp, label, name, refProp, ...rest})=>{
    return(
        <div>
            <label htmlFor={name}>{label}</label>
            <input type='file' name={name} ref={refProp} {...rest}/>
            {errProp[name]&&<span>{errProp[name].message}</span>}
        </div>
    )
}

//a resusalbe form wrapper component
export const FormComp =({children, submitProp})=>{
    return(
        <form onSubmit={submitProp}>
            {children}
        </form>
    )
}

//a reusable inpup component
export const InputComp=({errProp, label, name, refProp, ...rest})=>{
    return(
        <div>
            <label htmlFor={name}>{label}</label>
            <input name={name} ref={refProp} {...rest} />
            {errProp[name]&&<span>{errProp[name].message}</span>}
        </div>
    )
}

//reusable radio input component
export const RadioComp=({errProp, label, name, radioOptions,  refProp, ...rest})=>{
    return(
        <div>
            <legend>{label}</legend>
            {
                radioOptions.map(radio=>(
                    <div key={radio.value}>
                        <label>{radio.label}</label>
                        <input name={name} type='radio' ref={refProp} value={radio.value} {...rest}/>
                    </div>
                ))
            }
            {errProp[name]&&<span>{errProp[name].message}</span>}
        </div>
    )
}

//reusabel select input component
export const SelectComp=({errProp, label, name, selectOptions, refProp, ...rest})=>{
    return(
        <div>
            <label htmlFor={name}>{label}</label>
            <select name={name} ref={refProp}>
                {
                    selectOptions.map(option=>(
                            <option key={option.value} value={option.value}>{option.label}</option>
                    ))
                }
            </select>
            {errProp[name]&&<span>{errProp[name].message}</span>}
        </div>
    )
}