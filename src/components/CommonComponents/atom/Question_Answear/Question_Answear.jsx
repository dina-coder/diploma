import React, { useEffect, useState } from 'react';
import s from './Question_Answear.module.scss'

const Question_Answear = (props) => {
    return(
        <div>
            <div className={s.question}>
                {props.question}
            </div>
            <hr className={s.line} />
            <div>
                <textarea onChange={(e) => props.setCurAnswear([e.currentTarget.value])}/>
            </div>
        </div>
    )
}
export default Question_Answear;