import React, { useEffect, useState } from 'react';
import s from './Radiobutton.module.scss'

const Radiobutton = (props) => {
    let allVariants = props.variants.map((el, key)=> 
        <p key={el._id}><input className={s.variants} id={el._id} name={el.text} type="radio" onClick={()=>props.setCurAnswear([el.text])} checked={props.curAnswear[0]===el.text}/> {el.text}</p>)

    return(
        <div>
            <div className={s.question}>
                {props.question}
            </div>
            <hr className={s.line} />
            <div className={s.variants}>
                {allVariants}
            </div>
        </div>
    )}
export default Radiobutton;