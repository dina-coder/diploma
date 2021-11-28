import React from 'react';
import s from './Button.module.scss'
const Button = (props) => {
    return (
        <div>
            <button onClick={()=>props.handleClick()} className={s.container+' '+props.className}>
                {props.name}
            </button>
        </div>
    )
};
export default Button
