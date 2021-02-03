import React,{useState} from 'react'
import '../sass/styleDemo.css'

const StyleDemo = () => {
    const [spin, setSpin] = useState('')
    return (
        <div className='StyleDemo'>
            <div className={`one ${spin}`} onAnimationEnd={()=>setSpin('')}></div>
            <div className={`two ${spin}`} onAnimationEnd={()=>setSpin('')}></div>
            <div className='three'></div>
            <div className='four'></div>
             <div className='five'></div>
             <div className='six'></div>
             <div className='seven'></div>
             <div className='eight'></div>
             <div className='nine'></div>
             <div className={`ten ${spin}`} onAnimationEnd={()=>setSpin('')}></div>
             <h4 className={spin} onAnimationEnd={()=>setSpin('')} >Corona</h4>
             <button onClick={()=>setSpin('spin')}>Spin me</button>
        </div>
    )
}

export default StyleDemo
