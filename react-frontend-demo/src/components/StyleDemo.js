import React,{useState} from 'react'
// import '../sass/styleDemo.scss'

const StyleDemo = () => {
    const [spin, setSpin] = useState('')
    return (
        <div className='parentContainer StyleDemo'>
            <div className={`one ${spin}`} onAnimationEnd={()=>setSpin('')}>
                <div className='six'></div>
                <div className='seven'></div>
                <div className='eight'></div>
                <div className='nine'></div>
                <div className={`ten ${spin}`} onAnimationEnd={()=>setSpin('')}></div>
            </div>
           
            <div className={`two ${spin}`} onAnimationEnd={()=>setSpin('')}></div>
            <div className='three'></div>
            <div className='four'></div>
            <div className='five'></div>
            <h4 className={spin} onAnimationEnd={()=>setSpin('')} >Corona</h4>
            <button onClick={()=>setSpin('spin')}>Spin me</button>
        </div>
    )
}

export default StyleDemo
