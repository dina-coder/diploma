import React from 'react';
import s from './Checkbox.module.scss'

const Checkbox = (props) => {
    const changeAnswear = (text) =>{
    if (props.curAnswear.indexOf(text)!=-1){
        let changedId = -1;
        for (let i=0; i< props.curAnswear.length; i++){
            if (props.curAnswear[i]===text){
                changedId=i;
            }
        }
        if (changedId!==-1){
            let temp=[...props.curAnswear].slice(0, changedId)
            temp.push(...[...props.curAnswear].slice(changedId+1, props.curAnswear.length))
            props.setCurAnswear(temp)
    }
    }
    else
    {
        let temp = props.curAnswear;
        temp.push(text);
        props.setCurAnswear([...temp]);
    }
    }
    let allVariants = props.variants.map(el=> 
        <p><input className={s.variants} name={el._id} type="checkbox" checked={props.curAnswear.indexOf(el.text)!=-1} onClick={()=>changeAnswear(el.text)}/>{el.text}</p>)
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
    )
}
export default Checkbox;