import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import s from './Theory.module.scss'

const Theory = (props) => {
    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <div className={s.title}>Ваш ответ неверен</div>
                <div className={s.plus + " " + s.rotate} onClick={() => props.onClose(false)}></div>
            </div>
            <div className={s.textContainer}>
                <ReactMarkdown>
                    {props.theory}
                </ReactMarkdown>
            </div>
        </div>
    )
}
export default Theory;