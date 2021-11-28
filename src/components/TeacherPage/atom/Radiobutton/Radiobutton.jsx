import React, { useEffect, useState } from 'react';
import s from './Radiobutton.module.scss'

const Radiobutton = (props) => {
    let variants = props.variants;
    let changedId = -1;
    const delVariant = (id) => {
        changedId = -1;
        for (let i=0; i< props.variants.length; i++){
            if (props.variants[i]._id === id){
                changedId=i;
            }
        }
        if (changedId!==-1){
            variants=[...props.variants].slice(0, changedId)
            variants.push(...[...props.variants].slice(changedId+1, props.variants.length))
            props.setVariants(variants)
    }
}
    const changeVariants = (id, text) => {
        changedId = -1;
        for (let i=0; i< props.variants.length; i++){
            if (props.variants[i]._id === id){
                changedId=i;
            }
        }
        if (changedId!==-1){
            variants=[...props.variants].slice(0, changedId)
            variants.push({
                _id: id,
                text: text
            })
            variants.push(...[...props.variants].slice(changedId+1, props.variants.length))
            props.setVariants(variants)
        }
    }
    let allVariants = props.variants.map((el, key)=> 
        <p key={el._id}><input id={el._id} name={el.text} type="radio" checked={props.answear.indexOf(el.text)!==-1 ? true : false} onChange={()=>props.setAnswear([el.text])}/> 
            <input className={s.input}
                onChange={(e)=>changeVariants(el._id, e.currentTarget.value)} value={el.text}/>
                <span onClick={()=>delVariant(el._id)} className={s.plus + " " + s.rotate}></span></p>)

    return(
        <div>
            <div>
                <div>Вопрос:</div>
                <textarea onChange={(e)=>props.setQuestion(e.currentTarget.value)} value={props.question}/>
            </div>
            <div onClick={()=>props.setVariants([...variants,{
                _id: variants.length>0 ? variants[variants.length-1]._id+"1" : "1",
                text: ""
            }])} className={s.plus}></div>
            {allVariants}
        </div>
    )
}
export default Radiobutton;