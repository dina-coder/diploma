import React, { useEffect, useState } from 'react';
import s from './Question_Answear.module.scss'

const Question_Answear = (props) => {
    return(
        <div>
            <div>
                <div>Вопрос:</div>
                <textarea onChange={(e)=>props.setQuestion(e.currentTarget.value)} value={props.question}/>
            </div>
            <div>
                <div>Ответ:</div>
                <textarea onChange={(e)=>props.setAnswear([e.currentTarget.value])} value={props.answear[0]}/>
            </div>
        </div>
    )
}
export default Question_Answear;